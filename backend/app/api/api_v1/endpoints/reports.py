from fastapi import APIRouter

from app.services.report import ReportService
from app.schemas.report import ReportCreate, Report
from app.api.deps import get_current_active_user, get_current_admin_user
from fastapi import Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.deps import get_db
from app.core.config import settings

router = APIRouter()


@router.post("/", response_model=Report)
async def create_report(
    report_in: ReportCreate,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    report = await ReportService.create(db, report_in, current_user.id)
    return report


@router.get("/", response_model=list[Report])
async def get_reports(
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    reports = await ReportService.get_multi(db)
    return reports


@router.get("/{report_id}", response_model=Report)
async def get_report(
    report_id: int,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    report = await ReportService.get(db, report_id)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    return report


@router.delete("/{report_id}")
async def delete_report(
    report_id: int,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_admin_user),
):
    await ReportService.delete(db, report_id)
    return {"message": "Report deleted"}
