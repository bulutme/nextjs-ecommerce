/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { FetchResponse, MustHaveId } from "@/app/types/Product/types";
import ProductItem from "../Product/Item";
import { useInView } from "react-intersection-observer";
import Loading from "@/app/loading";
import EmptyProductList from "../Product/EmptyProductList";

type Props<T extends MustHaveId> = {
  initialItems: T[];
  search?: string;
  hasNextPage: boolean;
  fetchItems: (
    page: number,
    search?: string | undefined
  ) => Promise<FetchResponse<T>>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GridContainer = styled.div`
  display: grid;
  gap: 1rem;
  padding: 32px 16px;

  @media (min-width: ${({ theme }) => theme.screens.xs}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (min-width: ${({ theme }) => theme.screens.xl}) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const SpinnerWrapper = styled.div`
  margin-top: 15%;

  @media (min-width: ${({ theme }) => theme.screens["3xl"]}) {
    margin-top: 30%;
  }
`;

// MustHaveId ensure that the objects passed as items (T) in the InfinityScroll component have an id property.
const InfinityScroll = <T extends MustHaveId>({
  initialItems,
  search,
  hasNextPage,
  fetchItems,
}: Props<T>) => {
  // use the useInView hook to determine when the bottom of the container is in view.
  const [ref, inView] = useInView();

  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // memoize loadMore function to load more items
  const loadMore = useCallback(async () => {
    try {
      if (inView && page > 0) {
        const next = page + 1;
        const itemsData = await fetchItems(next, search!);
        if (itemsData.data?.length) {
          setPage(next);
          setIsLoading(itemsData.hasNextPage);
          setItems((prev: T[] | undefined) => [
            ...(prev?.length ? prev : []),
            ...itemsData.data,
          ]);
        }
      }
    } catch (error) {
      console.log(error, "error");
    }
  }, [page, inView, search]);

  // useEffect to initialize state when the component mounts or when the search prop changes.
  useEffect(() => {
    setPage(1);
    setItems(initialItems);
    setIsLoading(hasNextPage);
  }, [initialItems, search]);

  // useEffect to load more items when inView changes.
  useEffect(() => {
    loadMore();
  }, [inView]);

  if (!isLoading && items.length === 0) return <EmptyProductList />;

  return (
    <Container>
      <GridContainer>
        {items.map((item) => (
          <ProductItem key={item.id} {...item} />
        ))}
      </GridContainer>
      {isLoading && (
        <SpinnerWrapper ref={ref}>
          <Loading />
        </SpinnerWrapper>
      )}
    </Container>
  );
};

export default InfinityScroll;
