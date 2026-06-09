from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db
from app.schemas.token import Token
from app.schemas.user import UserCreate, User
from app.services.user import UserService
from app.core.security import create_access_token

router = APIRouter()


@router.post("/login", response_model=Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_db),
):
    user = await UserService.authenticate(
        db, form_data.username, form_data.password.get_secret_value()
    )
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    access_token = create_access_token(user.id)
    return Token(access_token=access_token)


@router.post("/register", response_model=User)
async def register(
    user_in: UserCreate,
    db: AsyncSession = Depends(get_db),
):
    user = await UserService.create(db, user_in)
    return user