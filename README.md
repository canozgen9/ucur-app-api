# UÇUR APPLICATION BACKEND

Vertex
- Can Özgen
- Ahmet Can Küçükkör
- Can Berk Durmuş

2 Numaralı Önerilmiş Proje

Detaylar yakında...


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


