import { useMemo, useReducer, useEffect } from 'react'
import createAction from '../utils/createAction'

export function useAuth() {
    const [state, dispatch] = useReducer(
        (currentState: any, action: any) => {
            switch (action.type) {
                case 'SET_USER':
                    return {
                        ...currentState,
                        user: action.payload.user,
                        tokens: action.payload.tokens,
                    }
                case 'REMOVE_USER':
                    return {
                        ...currentState,
                        user: undefined,
                        tokens: undefined,
                    }
                case 'SET_LOADING':
                    return {
                        ...currentState,
                        loading: action.payload,
                    }
                default: {
                    return currentState
                }
            }
        },
        { user: undefined, tokens: undefined, loading: true },
    )
    const auth = useMemo(
        () => ({
            login: (user: any, tokens: any) => {
                dispatch(createAction('SET_LOADING', true))
                localStorage.setItem('tokens', JSON.stringify(tokens))
                localStorage.setItem('user', JSON.stringify(user))
                dispatch(createAction('SET_USER', { tokens, user }))
                dispatch(createAction('SET_LOADING', false))
            },
            logout: () => {
                dispatch(createAction('SET_LOADING', true))
                localStorage.removeItem('tokens')
                localStorage.removeItem('user')
                dispatch(createAction('REMOVE_USER', {}))
                dispatch(createAction('SET_LOADING', false))
            },
        }),
        [],
    )

    useEffect(() => {
        const tokens = localStorage.getItem('tokens')
        const user = localStorage.getItem('user')

        if (tokens && user) {
            //get user from apollo o the token
            dispatch(createAction('SET_USER', { tokens: JSON.parse(tokens), user: JSON.parse(user) }))
        }
        dispatch(createAction('SET_LOADING', false))
    }, [])

    return { auth, state }
}
