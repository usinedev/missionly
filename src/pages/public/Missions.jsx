import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import { getMissions } from '@/services/missions.mock.js';
import MissionCard from '../../components/cards/MissionCard';
import FilterBtn from '../../components/ui/FilterBtn';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import ArrowLeft from "@/assets/icons/ArrowLeft.svg?react";
import ArrowRight from "@/assets/icons/ArrowRight.svg?react";

function Missions() {
    const [query, setQuery] = useState("");
    const [searchParams] = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [page, setPage] = useState(1);
    const PER_PAGE = 6;

    const missions = getMissions();

    function normalizeString(str) {
    return str
        .normalize("NFD")                 // sépare les accents
        .replace(/[\u0300-\u036f]/g, "")  // supprime les accents
        .toLowerCase();
    }

    useEffect(() => {
        const q = searchParams.get("q");
        if (q !== null) setQuery(q);
    }, [searchParams]);


    const filteredMissions = useMemo(() => {
        return missions.filter((mission) => {
        const matchCategory =
            selectedCategory === "all" || mission.category === selectedCategory;

        const matchQuery = normalizeString(mission.title).includes(normalizeString(query));

        return matchCategory && matchQuery;
        });
    }, [missions, selectedCategory, query]);

    useEffect(() => {
        setPage(1);
    }, [query, selectedCategory]);

    const totalPages = useMemo(() => {
        return Math.max(1, Math.ceil(filteredMissions.length / PER_PAGE));
    }, [filteredMissions.length]);

    const pageMissions = useMemo(() => {
        const start = (page - 1) * PER_PAGE;
        return filteredMissions.slice(start, start + PER_PAGE);
    }, [filteredMissions, page]);

    const isFirstPage = page <= 1;
    const isLastPage = page >= totalPages;

    function goPrev() {
        setPage((p) => Math.max(1, p - 1));
    }

    function goNext() {
        setPage((p) => Math.min(totalPages, p + 1));
    }


    return (
        <main className='main-missions section'>
            <section className='searchSection container'>
                    <Input
                        variant="search"
                        data-cy="search-input"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <div className="filters">
                        <FilterBtn selectedCategory={selectedCategory} onChange={setSelectedCategory}/>
                    </div>
            </section>

            <section className="resultsSection container">
                {query && (
                    <p className='resultsTitle'>Résultats pour <span className="query">{query}</span> :</p>
                )}
                <div className="infos">
                    <p>
                        {filteredMissions.length === 0
                            ? "Aucun résultat"
                            : filteredMissions.length === 1
                                ? "1 résultat"
                                : `${filteredMissions.length} résultats`}
                    </p>
                    <div className="tri">
                        <span className='triMuted'>Triez par :</span>
                        <span className='triValue'>Pertinence</span>
                    </div>
                </div>
                <div className="resultsCards">
                    {pageMissions.map((mission) => (
                        <MissionCard key={mission.id} mission={mission} />
                    ))}
                </div>
                <div className="pageNavigation">
                    <Button variant={isFirstPage ? 'disabled' : 'primary'} disabled={isFirstPage} Icon={ArrowLeft} iconPosition='left' size='small' onClick={goPrev}></Button>
                    <span className="activePage">{page}</span>
                    <Button variant={isLastPage ? 'disabled' : 'primary'} disabled={isLastPage} Icon={ArrowRight} iconPosition='right' size='small' onClick={goNext}></Button>
                </div>
            </section>
        </main>
    )
}

export default Missions
