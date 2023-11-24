/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { FetchProductsResponse, Product } from "@/app/types/Product/types";
import ProductItem from "../Product/Item";
import { useInView } from "react-intersection-observer";
import Loading from "@/app/loading";
import EmptyProductList from "../Product/EmptyProductList";

type Props = {
  initialData: Product[];
  search?: string;
  hasNextPage: Boolean;
  query: (
    page: number,
    search?: string | undefined
  ) => Promise<FetchProductsResponse>;
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

const InfinityScroll = ({ initialData, search, hasNextPage, query }: Props) => {
  const [ref, inView] = useInView();

  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  const loadMoreProducts = useCallback(async () => {
    try {
      if (inView && page > 0) {
        const next = page + 1;
        const productsData = await query(next, search!);
        if (productsData.data?.length) {
          setPage(next);
          setIsLoading(productsData.hasNextPage);
          setProducts((prev: Product[] | undefined) => [
            ...(prev?.length ? prev : []),
            ...productsData.data,
          ]);
        }
      }
    } catch (error) {
      console.log(error, "error");
    }
  }, [page, inView, search]);

  useEffect(() => {
    setPage(1);
    setProducts(initialData);
    setIsLoading(hasNextPage);
  }, [initialData, search]);

  useEffect(() => {
    loadMoreProducts();
  }, [inView]);

  if (!isLoading && products.length === 0) return <EmptyProductList />;

  return (
    <Container>
      <GridContainer>
        {products.map((item) => (
          <ProductItem
            key={item.id}
            name={item.name}
            description={item.description}
            image={item.image}
            price={item.price}
            id={item.id}
            brand={item.brand}
            category={item.category}
          />
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
