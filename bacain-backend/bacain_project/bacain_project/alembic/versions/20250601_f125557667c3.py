"""create users table

Revision ID: f125557667c3
Revises: c27bafadcdd0
Create Date: 2025-06-01 22:46:20.196536

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f125557667c3'
down_revision = 'c27bafadcdd0'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'users',
        sa.Column('id', sa.Integer, primary_key=True, nullable=False),
        sa.Column('username', sa.String(50), unique=True, nullable=False),
        sa.Column('email', sa.String(100), unique=True, nullable=False),
        sa.Column('password_hash', sa.String(128), nullable=False)
    )


def downgrade():
    op.drop_table('users')
