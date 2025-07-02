'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import AppBody from '@/components/app-layout/AppBody'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, BookOpen, Clock, Search } from 'lucide-react'
import { setsApi } from '@/lib/api/sets'
import SetsLoading from '@/components/placeholders/SetsLoading'
import { SetAttributes } from '@/types/set.types'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useRouter } from 'next13-progressbar'

export default function SpaceDetailsPage() {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const loadMoreRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300);
        return () => clearTimeout(timer);
    }, [search]);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
        refetch
    } = useInfiniteQuery({
        queryKey: ['userSets', debouncedSearch],
        queryFn: ({ pageParam = 1 }) => setsApi.getUserSets(pageParam, 20, debouncedSearch || undefined),
        getNextPageParam: (lastPage) => {
            return lastPage.pagination?.hasMore ? (lastPage.pagination.page + 1) : undefined;
        },
        initialPageParam: 1,
    });

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 0.1 }
        );

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const handleSetClick = (set: SetAttributes) => {
        router.push(`/space/set/${set.slug}`);
    };

    const formatDate = (dateString: string | Date | undefined) => {
        if (!dateString) return 'Never';
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return 'Today';
        if (diffDays === 2) return 'Yesterday';
        if (diffDays <= 7) return `${diffDays - 1} days ago`;
        if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
        return date.toLocaleDateString();
    };

    const allSets = data?.pages.flatMap(page => page.sets) || [];

    return (
        <AppBody
                heading='Your Learning Sets'
                subHeading='Manage your sets, track progress, and continue learning.'
                headerRightContent={
                    <Button onClick={() => router.push('/space/create')}>
                        <Plus className='h-4 w-4' />
                        Create Set
                    </Button>
                }
            >
                <div className="mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            placeholder="Search your learning sets..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                {isLoading ? (
                    <SetsLoading />
                ) : isError ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground mb-4">Failed to load your sets</p>
                        <Button onClick={() => refetch()} variant="outline">
                            Try Again
                        </Button>
                    </div>
                ) : allSets.length === 0 ? (
                    <div className="text-center py-12">
                        <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No learning sets yet</h3>
                        <p className="text-muted-foreground mb-6">
                            {search ? 'No sets match your search.' : 'Create your first learning set to get started.'}
                        </p>
                        {!search && (
                            <Button onClick={() => router.push('/space/create')}>
                                <Plus className='h-4 w-4' />
                                Create Your First Set
                            </Button>
                        )}
                    </div>
                ) : (
                    <>
                        <div className='grid gap-6 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3'>
                            {allSets.map((set: SetAttributes) => (
                                <Card 
                                    key={set.id} 
                                    className="group cursor-pointer hover:shadow-sm shadow-none transition-all duration-200 hover:bg-card bg-card/50"
                                    onClick={() => handleSetClick(set)}
                                >
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center gap-3">
                                            <div 
                                                className="w-10 h-10 rounded-lg flex self-start items-center justify-center text-white"
                                                style={{ backgroundColor: set.color }}
                                            >
                                                <i className={`fas ${set.iconClass} text-lg`} />
                                            </div>
                                            <div className="flex-1 min-w-0 grid grid-cols-1">
                                                <CardTitle className="text-base font-semibold truncate">
                                                    {set.name}
                                                </CardTitle>
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                    <Clock className="h-3 w-3" />
                                                    <span>{formatDate(set.lastUsed)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <CardDescription className="text-sm mb-3 line-clamp-2">
                                            {set.description}
                                        </CardDescription>
                                        <div className="flex flex-wrap gap-1">
                                            {set.keywords?.slice(0, 3).map((keyword, index) => (
                                                <Badge key={index} variant="secondary" className="text-xs">
                                                    {keyword}
                                                </Badge>
                                            ))}
                                            {set.keywords?.length > 3 && (
                                                <Badge variant="outline" className="text-xs">
                                                    +{set.keywords.length - 3}
                                                </Badge>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {hasNextPage && (
                            <div ref={loadMoreRef} className="flex justify-center py-8">
                                {isFetchingNextPage ? (
                                    <SetsLoading />
                                ) : (
                                    <div className="text-muted-foreground">
                                        Scroll for more sets...
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}
            </AppBody>
    )
}
