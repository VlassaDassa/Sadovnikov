export interface IEvolutionDraftItem {
    id: string
    name: string
    nameRu: string
    date: string
    dateRu: string
    text: string
    textRu: string
    sourceShas: string[]
}

export interface IEvolutionGenerationResult {
    draft: IEvolutionDraftItem[]
    generatedAt: string
    totalCommits: number
    analyzedCommits: number
}

export type EvolutionActionResult<T> =
    | {
        success: true
        data: T
    }
    | {
        success: false
        error: string
    }