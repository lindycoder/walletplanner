import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {GlobalWithFetchMock} from "jest-fetch-mock";

Enzyme.configure({ adapter: new Adapter() });

const customGlobal: GlobalWithFetchMock = global;
customGlobal.fetch = require('jest-fetch-mock');
customGlobal.fetchMock = customGlobal.fetch;
