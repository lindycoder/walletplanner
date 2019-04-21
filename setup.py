import versioneer
from setuptools import setup, find_packages

setup(
    name='walletplanner',
    version=versioneer.get_version(),
    cmdclass=versioneer.get_cmdclass(),
    description='Wallet Planner helps you plan how you spend your money!',
    author='Martin Roy',
    packages=find_packages(),
    include_package_data=True,
    license='MIT'
)
