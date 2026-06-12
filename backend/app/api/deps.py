from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.schemas.user import User
from app.services.user import UserService
from jose import jwt
from app.core.config import settings


async def get_current_user(
    db: AsyncSession = Depends(get_db),
) -> User:
    from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
    
    bearer = HTTPBearer(auto_error=False)
    credentials: HTTPAuthorizationCredentials | None = await Depends(bearer)
    
    if not credentials:
        from fastapi import HTTPException
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    try:
        payload = jwt.decode(
            credentials.credentials, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")
    except Exception:
        from fastapi import HTTPException
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user = await UserService.get(db, int(user_id))
    if not user:
        from fastapi import HTTPException
        raise HTTPException(status_code=401, detail="User not found")
    
    return user


async def get_current_active_user(
    current_user: User = Depends(get_current_user),
) -> User:
    if not current_user.is_active:
        from fastapi import HTTPException
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


async def get_current_admin_user(
    current_user: User = Depends(get_current_user),
) -> User:
    if current_user.role != "admin":
        from fastapi import HTTPException
        raise HTTPException(status_code=403, detail="Admin access required")
    return current_user