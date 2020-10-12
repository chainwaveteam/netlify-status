import { useEffect, useState } from 'react'
import NetlifyAPI from 'netlify'

import { NetlifySite, NetlifyUser } from './interfaces'

export interface NetlifyBaseData {
    user?: NetlifyUser
    sites?: NetlifySite[]
    status: 'idle' | 'success' | 'error'
}

export type NetlifyDataError = NetlifyBaseData & { status: 'error' }
export type NetlifyDataIdle = NetlifyBaseData & { status: 'idle' }
export type NetlifyDataSuccess = NetlifyBaseData & {
    user: NetlifyUser
    sites: NetlifySite[]
    status: 'success'
}

export type NetlifyData =
    | NetlifyDataSuccess
    | NetlifyDataError
    | NetlifyDataIdle

const INITIAL_DATA: NetlifyData = { user: undefined, sites: [], status: 'idle'  }
const ERROR_DATA: NetlifyData = { ...INITIAL_DATA, status: 'error'  }

async function fetchNetlify(apiKey?: string): Promise<NetlifyData> {
    if (!apiKey) {
        console.error('Netlify access token is missing')
        return ERROR_DATA
    }

    try {
        const client = new NetlifyAPI(apiKey)

        const sites = await client.listSites()
        const user = await client.getCurrentUser()

        return { user, sites, status: 'success' }
    } catch (error) {
        console.error(error)
        return ERROR_DATA
    }
}

function useNetlify(apiKey?: string): NetlifyData {
    const [data, setData] = useState(INITIAL_DATA)

    useEffect(() => {
        async function fetch() {
            const response = await fetchNetlify(apiKey)
            setData(response)
        }
        fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return data
}

export default useNetlify
