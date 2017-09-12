import sqlalchemy as sa


def get_users(metadata):
    return sa.Table(
        'users', metadata,
        sa.Column('id', sa.Integer, nullable=False, primary_key=True),
        sa.Column('username', sa.String(50), nullable=False),
        sa.Column('password', sa.String(255), nullable=False),

        sa.PrimaryKeyConstraint('id', name="users_id_pkey")
    )
