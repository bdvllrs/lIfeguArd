import sqlalchemy as sa


def get_pictures(metadata):
    return sa.Table(
        'pictures', metadata,
        sa.Column('id', sa.Integer, nullable=False, primary_key=True),
        sa.Column('path', sa.String(255), nullable=False),
        sa.Column('created_at', sa.DateTime()),
        sa.Column('is_active', sa.Boolean(), default=True),

        sa.PrimaryKeyConstraint('id', name="pictures_id_pkey")
    )
