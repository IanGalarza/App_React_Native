import { useEffect, useState } from 'react';
import * as rawgService from '../services/rawg.service';
import { Game } from '../types/rawg.types';

export function useGames(page = 1, pageSize = 10) {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pageInfo, setPageInfo] = useState<{ next: string | null; previous: string | null }>({
        next: null,
        previous: null,
    });

    useEffect(() => {
        setLoading(true);
        rawgService.getGames(page, pageSize)
            .then(data => {
                setGames(prevGames => 
                    page === 1 ? data.results : [...prevGames, ...data.results]
                );
                setPageInfo({ next: data.next, previous: data.previous });
                setError(null);
            })
            .catch(err => {
                setError(err.message);
                setGames([]);
            })
            .finally(() => setLoading(false));
    }, [page, pageSize]);

    return { games, loading, error, pageInfo };
}

export function useGameDetails(gameId: number | null) {
    const [game, setGame] = useState<Game | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (gameId === null) return;

        setLoading(true);
        rawgService.getGameDetails(gameId)
            .then(data => {
                setGame(data);
                setError(null);
            })
            .catch(err => {
                setError(err.message);
                setGame(null);
            })
            .finally(() => setLoading(false));
    }, [gameId]);

    return { game, loading, error };
}
