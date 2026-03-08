import { baseAPI } from "../../baseAPI/baseApi";

export interface ITenantProof {
    id: number;
    identity_doc: string | null;
    proof_income: string | null;
    proof_profession: string | null;
    proof_address: string | null;
    payslip: string | null;
    text_notice: string | null;
    created_at: string;
    updated_at: string;
}

export const tenantProofApi = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        getTenantProofs: build.query<ITenantProof[], number | void>({
            query: (user_id) => ({
                url: user_id ? `/tenant/proof/?user_id=${user_id}` : "/tenant/proof/",
                method: "GET",
            }),
            transformResponse: (response: any) => {
                // The API might return { success: true, message: "...", tenant_proof: [...] }
                // or sometimes just the object if it's a GET for a single one (though list usually returns array)
                const proofs = response?.tenant_proof || response?.results || (Array.isArray(response) ? response : []);

                if (Array.isArray(proofs)) {
                    return proofs;
                }

                // If it's a single object returned in an unexpected way
                if (response?.id || response?.identity_doc) {
                    return [response];
                }

                return [];
            },
            providesTags: ["TenantProof"],
        }),

        addTenantProof: build.mutation<{ success: boolean; message: string; tenant_proof: ITenantProof }, FormData>({
            query: (data) => ({
                url: "/tenant/proof/",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["TenantProof" as any],
        }),

        updateTenantProof: build.mutation<{ success: boolean; message: string; tenant_proof: ITenantProof }, { id: number; data: FormData }>({
            query: ({ id, data }) => ({
                url: `/tenant/proof/${id}/`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["TenantProof" as any],
        }),

        deleteTenantProof: build.mutation<{ success: boolean }, number>({
            query: (id) => ({
                url: `/tenant/proof/${id}/`,
                method: "DELETE",
            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    tenantProofApi.util.updateQueryData("getTenantProofs", undefined, (draft) => {
                        return draft.filter((proof) => proof.id !== id);
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
            invalidatesTags: ["TenantProof" as any],
        }),
    }),
});

export const {
    useGetTenantProofsQuery,
    useAddTenantProofMutation,
    useUpdateTenantProofMutation,
    useDeleteTenantProofMutation,
} = tenantProofApi;
