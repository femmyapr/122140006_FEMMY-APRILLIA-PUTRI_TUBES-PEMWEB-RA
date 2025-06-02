from sqlalchemy import Column, Integer, String
from bacain_project.models.meta import Base
import bcrypt

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String(128), nullable=False)

    def verify_password(self, password: str) -> bool:
        """Verifikasi password yang dimasukkan dengan hash."""
        try:
            return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))
        except ValueError:
            return False

    @staticmethod
    def hash_password(password: str) -> str:
        """Hash password menggunakan bcrypt."""
        hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        return hashed.decode('utf-8')

    def to_dict(self):
        """Representasi dictionary aman untuk dikirim ke frontend."""
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
