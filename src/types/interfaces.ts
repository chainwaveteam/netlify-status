export interface NetlifyUser {
    avatar_url: string
    full_name: string
    site_count: number
    slug: string
}

export interface NetlifySite {
    account_name: string
    account_slug: string
    account_type: string
    admin_url: string
    build_settings: {
        provider: string
        repo_path: string
        created_at: string
        updated_at: string
        repo_url: string
    }
    created_at: string
    deploy_hook: string
    deploy_id: string
    deploy_url: string
    disabled: null
    id: string
    id_domain: string
    lifecycle_state: string
    name: string
    screenshot_url: string
    site_id: string
    updated_at: string
    url: string
    user_id: string
}
