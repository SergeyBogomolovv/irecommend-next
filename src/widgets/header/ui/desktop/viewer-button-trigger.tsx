'use client';
import { useViewer } from '@/entities/viewer';
import { Avatar, DropdownTrigger, Skeleton, User } from '@nextui-org/react';

export function Trigger() {
  const { viewer, loading } = useViewer();
  return (
    <DropdownTrigger disabled={loading}>
      {loading ? (
        <div className="md:w-[160px] w-full flex items-center gap-3">
          <div>
            <Skeleton className="flex rounded-full size-10" />
          </div>
          <div className="w-full md:flex hidden flex-col gap-2">
            <Skeleton className="h-2.5 w-4/5 rounded-lg" />
            <Skeleton className="h-2.5 w-full rounded-lg" />
          </div>
        </div>
      ) : (
        <div className="transition-transform">
          <Avatar
            as="button"
            src={viewer?.profile.logo || ''}
            name={viewer?.profile.name.toLocaleUpperCase()}
            className="sm:flex hidden md:hidden"
          />
          <User
            as="button"
            className="md:flex hidden"
            name={viewer?.profile.name}
            description={viewer?.email}
            avatarProps={{
              src: viewer?.profile.logo || '',
              name: viewer?.profile.name?.toLocaleUpperCase()[0],
              className: 'text-2xl',
            }}
          />
        </div>
      )}
    </DropdownTrigger>
  );
}
