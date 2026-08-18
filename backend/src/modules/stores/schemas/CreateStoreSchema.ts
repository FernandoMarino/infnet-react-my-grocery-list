import z from "zod";

const CreateStoreSchema = z.object({
    name: z.string().min(2,"Store name must have at least 2 letters"),
    googlePlaceId: z.string().optional().nullish(),
    address: z.string().optional().nullish(),
    city: z.string().min(3).optional().nullish(),
    province: z.string().length(2).optional().nullish(),
    postalCode: z.string().min(5).optional().nullish(),
    country: z.string().min(2, "Country must have at least 2 letters").optional().nullish(),
    
})
export default CreateStoreSchema