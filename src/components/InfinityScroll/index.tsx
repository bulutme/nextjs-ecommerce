"use client";

import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Product } from "@/app/types/Product/types";
import ProductItem from "../Product/Item";
import { useInView } from "react-intersection-observer";
import Spinner from "../Spinner";
import { useSearchParams } from "next/navigation";
import { fetchProducts } from "@/lib/api";
import EmptyProductList from "../Product/EmptyProductList";

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

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (min-width: ${({ theme }) => theme.screens.xl}) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const SpinnerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 15%;
`;

const InfinityScroll = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("query");
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [ref, inView] = useInView();
  const [isloading, setIsLoading] = useState<boolean>(true);

  const getInitialProducts = useCallback(async () => {
    try {
      const response = await fetchProducts(1, search!);
      setProducts(response.data);
      setIsLoading(response.hasNextPage);
      setPage(1);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  }, [search]);

  const loadMoreProducts = useCallback(async () => {
    try {
      const next = page + 1;
      const productsData = await fetchProducts(next, search!);
      if (productsData.data?.length) {
        setPage(next);
        setIsLoading(productsData.hasNextPage);
        setProducts((prev: Product[] | undefined) => [
          ...(prev?.length ? prev : []),
          ...productsData.data,
        ]);
      }
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  }, [page, search]);

  useEffect(() => {
    getInitialProducts();
  }, [getInitialProducts, search]);

  useEffect(() => {
    if (inView) {
      loadMoreProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

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
          />
        ))}
      </GridContainer>
      {isloading && (
        <SpinnerWrapper ref={ref}>
          <Spinner />
        </SpinnerWrapper>
      )}
      {!isloading && products.length === 0 && <EmptyProductList />}
    </Container>
  );
};

export default InfinityScroll;
