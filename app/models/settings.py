import sqlalchemy as sa


def get_settings(metadata):
    return sa.Table(
        'settings', metadata,
        sa.Column('id', sa.Integer, nullable=False, primary_key=True),
        sa.Column('name', sa.String(20), nullable=False),
        sa.Column('content', sa.String(255)),

        sa.PrimaryKeyConstraint('id', name="settings_id_pkey")
    )
