import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import { getMissions } from '@/services/missions.mock.js';
import MissionCard from '../../components/cards/MissionCard';
import FilterBtn from '../../components/ui/FilterBtn';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import ArrowLeft from "@/assets/icons/ArrowLeft.svg?react";
import ArrowRight from "@/assets/icons/ArrowRight.svg?react";
import { motion, AnimatePresence } from 'motion/react';
import { Api } from '@/services/api';

function Missions() {
    const [query, setQuery] = useState("");
    const [searchParams] = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [page, setPage] = useState(1);
    const PER_PAGE = 6;
    const [missions, setMissions] = useState([])

    useEffect(()=>{
        async function getMissions() {
            const missions = await Api.getMissionsPublished();
            console.log(missions);
            setMissions(missions)
        }
        getMissions()
    }, [])

    

    // function normalizeString(str) {
    // return str
    //     .normalize("NFD")
    //     .replace(/[\u0300-\u036f]/g, "")
    //     .toLowerCase();
    // }

    // useEffect(() => {
    //     const q = searchParams.get("q");
    //     if (q !== null) setQuery(q);
    // }, [searchParams]);

    const filteredMissions = missions
    // useMemo(() => {
    //     return missions.filter((mission) => {
    //     const matchCategory =
    //         selectedCategory === "all" || mission.category === selectedCategory;

    //     const matchQuery = normalizeString(mission.title).includes(normalizeString(query));

    //     return matchCategory && matchQuery;
    //     });
    // }, [missions, selectedCategory, query]);

    // useEffect(() => {
    //     setPage(1);
    // }, [query, selectedCategory]);

    // const totalPages = useMemo(() => {
    //     return Math.max(1, Math.ceil(filteredMissions.length / PER_PAGE));
    // }, [filteredMissions.length]);

    // const pageMissions = useMemo(() => {
    //     const start = (page - 1) * PER_PAGE;
    //     return filteredMissions.slice(start, start + PER_PAGE);
    // }, [filteredMissions, page]);
    let totalPages = 6

    const isFirstPage = page <= 1;
    const isLastPage = page >= totalPages;

    function goPrev() {
        setPage((p) => Math.max(1, p - 1));
    }

    function goNext() {
        setPage((p) => Math.min(totalPages, p + 1));
    }

    // ===== Motion setup =====
    const EASE = [0.22, 1, 0.36, 1];

    const viewport = {
        once: true,
        amount: 0.35,
        margin: "0px 0px -10% 0px",
    };

    const reveal = {
        hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)" },
    };

    const pop = {
        hidden: { opacity: 0, y: 10, scale: 0.98, filter: "blur(4px)" },
        show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
    };

    const fade = {
        hidden: { opacity: 0 },
        show: { opacity: 1 },
    };

    const transition = (delay = 0, duration = 0.7) => ({
        duration,
        ease: EASE,
        delay,
    });

    const stagger = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.02,
            },
        },
    };

    return (
        <main className='main-missions section'>
            <motion.section
                className='searchSection container'
                variants={stagger}
                initial="hidden"
                animate="show"
            >
                    <motion.div
                        variants={pop}
                        transition={transition(0, 0.75)}
                        className='inputDiv'
                    >
                        <Input
                            variant="search"
                            data-cy="search-input"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </motion.div>

                    <motion.div
                        className="filters"
                        variants={reveal}
                        transition={transition(0.08, 0.75)}
                    >
                        <FilterBtn selectedCategory={selectedCategory} onChange={setSelectedCategory}/>
                    </motion.div>
            </motion.section>

            <section className="resultsSection container">
                <AnimatePresence mode="popLayout">
                    {query && (
                        <motion.p
                            className='resultsTitle'
                            key={`resultsTitle-${query}`}
                            variants={reveal}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            transition={transition(0, 0.55)}
                        >
                            Résultats pour <span className="query">{query}</span> :
                        </motion.p>
                    )}
                </AnimatePresence>

                <motion.div
                    className="infos"
                    variants={stagger}
                    initial="hidden"
                    animate="show"
                >
                    <motion.p
                        key={`count-${filteredMissions.length}-${selectedCategory}-${query}`}
                        variants={fade}
                        transition={transition(0, 0.35)}
                    >
                        {filteredMissions.length === 0
                            ? "Aucun résultat"
                            : filteredMissions.length === 1
                                ? "1 résultat"
                                : `${filteredMissions.length} résultats`}
                    </motion.p>

                    <motion.div
                        className="tri"
                        variants={reveal}
                        transition={transition(0.06, 0.6)}
                        whileHover={{ y: -1 }}
                    >
                        <span className='triMuted'>Triez par :</span>
                        <motion.span
                            className='triValue'
                            key={`tri-${query}-${selectedCategory}-${page}`}
                            initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={transition(0.02, 0.45)}
                        >
                            Pertinence
                        </motion.span>
                    </motion.div>
                </motion.div>

                <div className="resultsCards">
                    {missions.map((mission) => (
                        <MissionCard key={mission.id} mission={mission} />
                    ))}
                </div>

                <motion.div
                    className="pageNavigation"
                    variants={reveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewport}
                    transition={transition(0.05, 0.65)}
                >
                    <Button
                        variant={isFirstPage ? 'disabled' : 'primary'}
                        disabled={isFirstPage}
                        Icon={ArrowLeft}
                        iconPosition='left'
                        size='small'
                        onClick={goPrev}
                    ></Button>

                    <AnimatePresence mode="popLayout">
                        <motion.span
                            className="activePage"
                            key={`page-${page}`}
                            initial={{ opacity: 0, y: 6, scale: 0.98, filter: "blur(4px)" }}
                            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -6, scale: 0.98, filter: "blur(4px)" }}
                            transition={transition(0, 0.35)}
                        >
                            {page}
                        </motion.span>
                    </AnimatePresence>

                    <Button
                        variant={isLastPage ? 'disabled' : 'primary'}
                        disabled={isLastPage}
                        Icon={ArrowRight}
                        iconPosition='right'
                        size='small'
                        onClick={goNext}
                    ></Button>
                </motion.div>
            </section>
        </main>
    )
}

export default Missions