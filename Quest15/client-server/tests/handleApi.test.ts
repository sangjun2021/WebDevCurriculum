import HandleApi from '../src/utils/HandleApi';
import Api from '../src/api/graphqlApi';
import { apiType } from '../src/types';

jest.mock('../src/api/graphqlApi');
const mockedApi = Api as jest.Mocked<typeof apiType>;
beforeEach(() => {
  mockedApi.mockClear();
});

test('getList test', () => {
  const handleApi = new HandleApi(new mockedApi());
  const apiInstance = mockedApi.mock.instances[0];
  handleApi.getList();
  expect(apiInstance.getFileList).toHaveBeenCalledTimes(1);
  expect(apiInstance.getFileList).toHaveBeenCalledWith();
});
test('createFile test', () => {
  const handleApi = new HandleApi(new mockedApi());
  const apiInstance = mockedApi.mock.instances[0];
  handleApi.createFile();
  expect(apiInstance.createFile).toHaveBeenCalledTimes(1);
  expect(apiInstance.createFile).toHaveBeenCalledWith({ isEdited: false, text: '', title: 'untitled' });
});

test('insertFile test', () => {
  const handleApi = new HandleApi(new mockedApi());
  const apiInstance = mockedApi.mock.instances[0];
  const dummyPost = { title: 'test' };
  handleApi.insertFile(dummyPost);
  expect(apiInstance.createFile).toHaveBeenCalledTimes(1);
  expect(apiInstance.createFile).toHaveBeenCalledWith(dummyPost);
});
test('removeFile test', () => {
  const handleApi = new HandleApi(new mockedApi());
  const apiInstance = mockedApi.mock.instances[0];
  handleApi.removeFile('testId');
  expect(apiInstance.deleteFile).toHaveBeenCalledTimes(1);
  expect(apiInstance.deleteFile).toHaveBeenCalledWith('testId');
});
