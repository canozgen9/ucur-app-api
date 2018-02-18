# UÇUR APPLICATION BACKEND

Vertex
- Can Özgen
- Ahmet Can Küçükkör
- Can Berk Durmuş

2 Numaralı Önerilmiş Proje

URL: http://23.251.128.252:3000/api


# @POST /api/create-user
======
- #### parameters
{
    "name":
    "username":
    "password":
}

- #### returns if(fails)
{
    success: boolean,
    message: string
}

- #### returns if(success)
{
    success: boolean,
    user: UserModel
}

# @POST /api/signin
======
- #### parameters
{
    "name":
    "username":
    "password":
}

- #### returns if(fails)
{
    success: boolean,
    message: string
}

- #### returns if(success)
{
    success: boolean,
    user: UserModel,
    token: string
}

# @GET /api/categories
======
- #### returns if(fails)
{
    success: boolean,
    message: string
}

- #### returns if(success)
{
    success: boolean,
    categories: categories,
}

# @GET /api/transport/requests
======
- #### returns if(fails)
{
    success: boolean,
    message: string
}

- #### returns if(success)
{
    success: boolean,
    transportRequestModels: transportRequestModels,
}

# @GET /api/transport/offers
======
- #### returns if(fails)
{
    success: boolean,
    message: string
}

- #### returns if(success)
{
    success: boolean,
    transportOfferModels: transportOfferModels,
}

# @GET /api/claim/requests
======
- #### returns if(fails)
{
    success: boolean,
    message: string
}

- #### returns if(success)
{
    success: boolean,
    claimRequestModels: claimRequestModels,
}

# @GET /api/claim/offers
======
- #### returns if(fails)
{
    success: boolean,
    message: string
}

- #### returns if(success)
{
    success: boolean,
    claimOfferModels: claimOfferModels,
}

# @POST /api/u/check
======
- #### parameters
{
    "token":
}

- #### returns if(fails)
{
    success: boolean,
    message: string
}

- #### returns if(success)
{
    success: boolean,
    user: UserModel,
}

# @POST /api/u/transport/request/create
======
- #### parameters
{
    TransportRequestModel
}

- #### returns if(fails)
{
    success: boolean,
    message: string
}

- #### returns if(success)
{
    success: boolean,
    transportRequestModel: transportRequestModel,
}

# @POST /api/u/transport/offer/create
======
- #### parameters
{
    TransportOfferModel
}

- #### returns if(fails)
{
    success: boolean,
    message: string
}

- #### returns if(success)
{
    success: boolean,
    transportOfferModel: transportOfferModel,
}

# @POST /api/u/claim/request/create
======
- #### parameters
{
    ClaimRequestModel
}

- #### returns if(fails)
{
    success: boolean,
    message: string
}

- #### returns if(success)
{
    success: boolean,
    claimRequestModel: claimRequestModel,
}

# @POST /api/u/claim/offer/create
======
- #### parameters
{
    ClaimOfferModel
}

- #### returns if(fails)
{
    success: boolean,
    message: string
}

- #### returns if(success)
{
    success: boolean,
    claimOfferModel: claimOfferModel,
}

# @POST /api/u/user/profile
======
- #### parameters
{
    "_id":
}

- #### returns if(fails)
{
    success: boolean,
    message: string
}

- #### returns if(success)
{
    success: boolean,
    userInformation: UserModel,
    userProfile: JSON
}

# @POST /api/u/transport/offers
======
- #### parameters
{
    "_id":
}

- #### returns if(fails)
{
    success: boolean,
    message: string
}

- #### returns if(success)
{
    success: boolean,
    claimRequest: claimRequestModel,
    transportOfferModels: JSON
}

# @POST /api/u/claim/offers
======
- #### parameters
{
    "_id":
}

- #### returns if(fails)
{
    success: boolean,
    message: string
}

- #### returns if(success)
{
    success: boolean,
    transportRequest: transportRequestModel,
    claimOfferModels: JSON
}

# @POST /api/u/claim/offers
======
- #### parameters
{
    "type":
    "_id":
    "status":
}

- #### returns if(fails)
{
    success: boolean,
    message: string
}

- #### returns if(success)
{
    success: boolean,
    transportRequest: transportRequestModel,
    info: JSON
}
