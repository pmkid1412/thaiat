import { useMeta } from "@/shared/hooks/useMeta.hook";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { AddOrUpdateUserForm } from "@/components/features/admin/users/form/AddOrUpdate";
import { UpgradeUser } from "@/components/features/admin/users/form/UpgradeUser";
import { columns } from "@/components/features/admin/users/list/columns";
import { UserList } from "@/components/features/admin/users/list/UserList";
import { UsersOverview } from "@/components/features/admin/users/overview/UserOverview";
import { UsersSearchFilter } from "@/components/features/admin/users/search-filter";
import { Pagination } from "@/components/features/common/Pagination";
import { Card } from "@/components/ui/card";
import {
  useUserCreateMutation,
  useUserDeleteMutation,
  useUserDetailQuery,
  useUsersOverviewQuery,
  useUsersQuery,
  useUserUpdateMutation,
  useUserUpgradeAccountMutation,
} from "@/services/queries/user.query";
import type {
  UpgradeUserByTypeRequest,
  UserSearchParams
} from "@/services/types";
import { ProPlanType } from "@/shared/constants";
import type {
  UserApiRequest,
  UserFormData,
} from "@/shared/schemas/user.schema";

export const Route = createFileRoute("/_dashboard/users")({
  component: RouteComponent,
});

function RouteComponent() {
  useMeta({ title: "Người dùng" });

  const [queryParams, setQueryParams] = useState<UserSearchParams>({
    page: 1,
    pageSize: 50,
  });
  const [selectedId, setSelectedId] = useState<number>();
  const [userFormOpen, setUserFormOpen] = useState(false);
  const [upgradeAccOpen, setUpgradeAccOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const users = useUsersQuery(queryParams);
  const createUser = useUserCreateMutation();
  const updateUser = useUserUpdateMutation();
  const userDetail = useUserDetailQuery(selectedId);
  const deleteUser = useUserDeleteMutation();
  const updateUserByType = useUserUpgradeAccountMutation();
  const userOverview = useUsersOverviewQuery();

  // Convert UserDetails to UserFormData
  const userFormData = useMemo<UserFormData | undefined>(() => {
    if (!userDetail.data) return undefined;

    const user = userDetail.data;
    const latestUpgrade = user.upgradeHistories?.[0];

    // Map upgradeType to proPlanType
    let proPlanType: string | undefined;
    if (latestUpgrade?.upgradeType) {
      const upgradeTypeMap: Record<string, string> = {
        "3 months": ProPlanType.THREE_MONTHS,
        "6 months": ProPlanType.SIX_MONTHS,
        "12 months": ProPlanType.TWELVE_MONTHS,
        custom: ProPlanType.CUSTOM,
      };
      proPlanType = upgradeTypeMap[latestUpgrade.upgradeType];
    }

    // Convert dates from "YYYY-MM-DD HH:mm:ss" to "YYYY-MM-DD"
    const formatDate = (dateStr?: string | null) => {
      if (!dateStr) return undefined;
      return dateStr.split(" ")[0];
    };

    return {
      name: user.name || "",
      email: user.email || "",
      avatar: user.avatar || undefined,
      dateOfBirth: user.dateOfBirth || undefined,
      timeOfBirth: user.timeOfBirth || undefined,
      placeOfBirth: user.placeOfBirth || undefined,
      userType: String(user.userType),
      timezone: user.timezone,
      proPlanType,
      proPlanStartDate: formatDate(latestUpgrade?.startDate),
      proPlanEndDate: formatDate(latestUpgrade?.endDate),
      autoRenew: false,
      upgradePlanReason: latestUpgrade?.upgradeReason || undefined,
    };
  }, [userDetail.data]);

  const handleEditUser = (id: number) => {
    setSelectedId(id);
    setUserFormOpen(true);
  };

  const handleUserFormSubmit = async (data: UserApiRequest) => {
    if (selectedId) {
      await updateUser.mutateAsync({ id: selectedId, data });
    } else {
      await createUser.mutateAsync(data);
    }

    users.refetch();
    userOverview.refetch();
    setUserFormOpen(false);
    setSelectedId(undefined);
  };

  const handleDeleteUser = async (id: number) => {
    await deleteUser.mutateAsync(id);
    users.refetch();
    userOverview.refetch();
  };

  const handleCloseForm = () => {
    setSelectedId(undefined);
    setUserFormOpen(false);
  };

  const handleOpenUserUpgrade = (id: number) => {
    setSelectedId(id);
    setUpgradeAccOpen(true);
  };

  const handleUpdateUserType = async (data: UpgradeUserByTypeRequest) => {
    await updateUserByType.mutateAsync(data);
    users.refetch();
    userOverview.refetch();
    setSelectedId(undefined);
  };

  const handleUpgradeFormOpenChange = (open: boolean) => {
    setUpgradeAccOpen(open);
    if (!open) {
      setSelectedId(undefined);
    }
  }

  return (
    <div className="flex gap-10 flex-col">
      <UsersOverview data={userOverview.data} />

      <Card className="shadow-sm overflow-hidden py-5">
        <div className="flex gap-4 justify-between px-4">
          <UsersSearchFilter onChange={setQueryParams} />
          <AddOrUpdateUserForm
            open={userFormOpen}
            onOpenChange={setUserFormOpen}
            title={selectedId ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
            submitText={selectedId ? "Cập nhật" : "Thêm"}
            defaultValues={selectedId ? userFormData : undefined}
            loading={createUser.isPending || updateUser.isPending}
            onSubmit={handleUserFormSubmit}
            onClose={handleCloseForm}
          />
          <UpgradeUser
            open={upgradeAccOpen}
            onOpenChange={handleUpgradeFormOpenChange}
            userId={selectedId}
          />
        </div>

        <UserList
          columns={columns}
          data={users.data?.data || []}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
          onUpdateType={handleUpdateUserType}
          onOpenUserUpgrade={handleOpenUserUpgrade}
          loading={users.isPending}
        />

        <Pagination
          totalPages={users.data?.totalPages || 0}
          currentPage={currentPage}
          totalItems={users.data?.total ?? 0}
          pageSize={users.data?.pageSize ?? queryParams.pageSize ?? 50}
          onPageChange={(page) => {
            setCurrentPage(page);
            setQueryParams((prev) => ({
              ...prev,
              page,
            }));
          }}
        />
      </Card>
    </div>
  );
}
