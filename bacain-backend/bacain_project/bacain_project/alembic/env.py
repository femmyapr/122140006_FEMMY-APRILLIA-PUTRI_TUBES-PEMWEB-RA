"""Pyramid bootstrap environment for Alembic migrations."""

import sys
import os
from alembic import context
from pyramid.paster import get_appsettings, setup_logging
from sqlalchemy import engine_from_config

# Tambahkan direktori root proyek ke sys.path agar import package berhasil
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from bacain_project.models.meta import Base  # import Base dengan impor absolut

# Ini konfigurasi Alembic dari file alembic.ini
config = context.config

# Setup logging sesuai konfigurasi
setup_logging(config.config_file_name)

# Load setting dari development.ini atau production.ini
settings = get_appsettings(config.config_file_name)

# Target metadata untuk autogenerate migration
target_metadata = Base.metadata


def run_migrations_offline():
    """Run migrations in 'offline' mode.

    Uses just the DB URL, no actual connection.
    """
    url = settings['sqlalchemy.url']
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """Run migrations in 'online' mode.

    Creates engine and connection.
    """
    engine = engine_from_config(settings, prefix='sqlalchemy.')
    connection = engine.connect()

    context.configure(
        connection=connection,
        target_metadata=target_metadata,
        # Optional: 
        # compare_type=True,  # agar perubahan tipe kolom terdeteksi
    )

    try:
        with context.begin_transaction():
            context.run_migrations()
    finally:
        connection.close()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
