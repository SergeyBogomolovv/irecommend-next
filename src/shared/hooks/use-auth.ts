'use client';
import { ViewerDocument } from '@/shared/graphql/generated/graphql';
import { useQuery } from '@apollo/client';

export const useAuth = () => {
  const { data, error, loading } = useQuery(ViewerDocument);
  return { loading, viewer: error ? null : data?.profile };
};