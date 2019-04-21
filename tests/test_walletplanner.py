import walletplanner


def test_version():
    """Package should have a version defined"""
    version = getattr(walletplanner, '__version__', None)
    assert version is not None
