from abc import ABCMeta
from asyncio.futures import Future
from collections.abc import Callable
from dataclasses import dataclass
from functools import partial
from unittest import mock

from flexmock import flexmock


# noinspection PyArgumentList
def flexermock(target):
    if isinstance(target, type):
        if type(target) is ABCMeta:
            with mock.patch.object(target, "__abstractmethods__", set()):
                target = target.__new__(target)
        else:
            target = target.__new__(target)

    return flexmock(target)


@dataclass
class Captive:
    done: Callable

    def __eq__(self, other):
        self.done(other)
        return True


class NotCaptured(Exception):
    pass


_NOT_CAPTURED = object()


class Captor:
    captives = None

    def __init__(self):
        self.reset()

    def __getattr__(self, item):
        try:
            if self.captives[item] is _NOT_CAPTURED:
                raise NotCaptured(f"Item \"{item}\" did not capture a value yet, was the expected call made?")

            return self.captives[item]
        except KeyError:
            self.captives[item] = _NOT_CAPTURED
            return Captive(partial(self.captured, item))

    def captured(self, item, value):
        self.captives[item] = value

    def reset(self):
        self.captives = {}


capture = Captor()


class MyFuture(Future):

    def __init__(self):
        super().__init__()


def awaitable(result):
    future = Future()
    future.set_result(result)
    return future
