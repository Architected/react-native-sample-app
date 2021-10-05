import { getError } from '../../../helper/getError';
import frontChannelService from '../../../service/frontChannelService';
import * as fileActionType from '../../constants/file';

export const uploadFileAction = async (requestData, dispatch, tokenValue) => {
  try {
    dispatch({ type: fileActionType.FILE_CREATE_REQUEST });

    var uploadRequest = {
      name: requestData.name ?? requestData.file[0].name,
      description: requestData.description,
    };

    console.log('uploadRequest' + uploadRequest);
    const formData = new FormData();
    formData.append('item', JSON.stringify(uploadRequest));
    formData.append('file', requestData.file[0]);

    console.log('uploadRequest' + uploadRequest);

    var frontChannel = frontChannelService();
    const { data } = await frontChannel.file().upload(formData, tokenValue);

    console.log('responseData: ' + JSON.stringify(data));

    if (!data.inError) {
      dispatch({ type: fileActionType.FILE_CREATE_SUCCESS });
    } else {
      dispatch({
        type: fileActionType.FILE_CREATE_FAIL,
        payload: getError(data),
      });
    }

    return data;
  } catch (err) {
    console.log(err.toString());
    dispatch({
      type: fileActionType.FILE_CREATE_FAIL,
      payload: 'An error has occured',
    });
  }
};

export const getAllFiles = async (dispatch, tokenValue) => {
  try {
    dispatch({ type: fileActionType.FILELIST_FETCH_REQUEST });
    console.log('before responseData.data.fileList');

    var frontChannel = frontChannelService();
    const responseData = await frontChannel.file().getAllFiles(tokenValue);

    dispatch({
      type: fileActionType.FILELIST_FETCH_SUCCESS,
      payload: responseData.data.fileList,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: fileActionType.FILELIST_FETCH_FAIL,
      payload: 'An error has occured',
    });
  }
};

export const getFile = async (fileId, dispatch, tokenValue) => {
  try {
    dispatch({ type: fileActionType.FILE_FETCH_REQUEST });

    var frontChannel = frontChannelService();
    const { data } = await frontChannel.file().getFile(fileId, tokenValue);

    if (!data.InError) {
      dispatch({
        type: fileActionType.FILE_FETCH_SUCCESS,
        payload: {
          file: data.file,
        },
      });
    } else {
      dispatch({
        type: fileActionType.FILE_FETCH_FAIL,
        payload: 'An error has occured retrieving the file',
      });
    }

    return data;
  } catch (err) {
    dispatch({
      type: fileActionType.FILE_FETCH_FAIL,
      payload: 'An error has occured retrieving the file',
    });
  }
};

export const deleteFile = async (fileId, dispatch, tokenValue) => {
  console.log('Deleting fileGlobalId: ' + fileId);
  dispatch({ type: fileActionType.FILE_DELETE_REQUEST });

  try {
    var frontChannel = frontChannelService();
    await frontChannel.file().deleteFile(fileId, tokenValue);

    dispatch({ type: fileActionType.FILE_DELETE_SUCCESS });
  } catch (err) {
    dispatch({
      type: fileActionType.FILE_DELETE_FAIL,
      payload: 'An error has occured deleting the file',
    });
  }
};

export const updateFileAction = async (requestData, dispatch, tokenValue) => {
  try {
    dispatch({ type: fileActionType.FILE_UPDATE_REQUEST });

    console.log('calling update file record');
    var frontChannel = frontChannelService();
    await frontChannel
      .file()
      .updateFile(requestData.globalId, requestData, tokenValue);

    console.log('file update success');
    dispatch({
      type: fileActionType.FILE_UPDATE_SUCCESS,
    });
  } catch (err) {
    console.log(err.toString());
    dispatch({
      type: fileActionType.FILE_UPDATE_FAIL,
      payload: err.toString(),
    });
  }
};

export const downloadFileAction = async (fileGlobalId, tokenValue) => {
  var frontChannel = frontChannelService();
  return await frontChannel.file().download(fileGlobalId, tokenValue);
};

export const downloadAsset = async (fileGlobalId, tokenValue) => {
  var frontChannel = frontChannelService();
  return await frontChannel.file().downloadAsset(fileGlobalId, tokenValue);
};

export const downloadThumbnail = async (fileGlobalId, tokenValue) => {
  var frontChannel = frontChannelService();
  return await frontChannel.file().downloadThumbnail(fileGlobalId, tokenValue);
};
