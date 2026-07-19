export interface IEvolutionDraftItem {
    id: string;
    name: string;
    date: string;
    text: string;
    sourceShas: string[];
}

export interface IEvolutionGenerationResult {
    draft: IEvolutionDraftItem[];
    generatedAt: string;
    totalCommits: number;
    analyzedCommits: number;
}

export type EvolutionActionResult<T> =
    | {
          success: true;
          data: T;
      }
    | {
          success: false;
          error: string;
      };