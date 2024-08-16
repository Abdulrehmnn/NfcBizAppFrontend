import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { baseUrl } from '../Config';

export const HandlerCreateTicket = async (subject, description) => {

  try {
    const token = await AsyncStorage.getItem('token');
    const id = await AsyncStorage.getItem('id');
    // setDisable(true);
    const response = await axios.post(baseUrl + '/ticket', {
      "user": id,
      "subject": subject,
      "description": description,
      "created_by": id,
      "status": 'open',
    }, {
      headers: {
        "x-access-token": token
      }
    });
    // console.log(response.data);
    return "Bug Reported Successfully!!"
  } catch (error) {
    // console.log(error.message);
    return error.message;
  }
}


export const HandlerCreateConnection = async (name, pass) => {

  try {
    const token = await AsyncStorage.getItem('token');
    const id = await AsyncStorage.getItem('id');
    // setDisable(true);
    const response = await axios.post(baseUrl + '/connection', {
      "userId": id,
      "name": name,
      "pass": pass,
      "created_by": id,
    }, {
      headers: {
        "x-access-token": token
      }
    });
    // console.log(response.data);
    return "Bug Reported Successfully!!"
  } catch (error) {
    // console.log(error.message);
    return error.message;
  }
}

export const HandlerUpdateWebsite = async (url) => {

  try {
    const token = await AsyncStorage.getItem('token');
    const id = await AsyncStorage.getItem('id');
    // setDisable(true);
    const response = await axios.put(baseUrl + '/website', {
      "userId": id,
      "url": url,
      // "created_by": id,
    }, {
      headers: {
        "x-access-token": token
      }
    });
    console.log(response.data);
    return "website Updated sucess"
  } catch (error) {
    // console.log(error.message);
    return error.message;
  }
}

export const HandlerUpdateDoc = async (link) => {

  try {
    console.log(link)
    const token = await AsyncStorage.getItem('token');
    const id = await AsyncStorage.getItem('id');
    // setDisable(true);
    const response = await axios.put(baseUrl + '/doc', {
      "userId": id,
      "link": link
    }, {
      headers: {
        "x-access-token": token
      }
    });
    console.log(response.data);
    return "Doc Updated sucess"
  } catch (error) {
    // console.log(error.message);
    return error.message;
  }
}

export const HandlerUpdateLinkTree = async (link) => {

  try {
    console.log(link)
    const token = await AsyncStorage.getItem('token');
    const id = await AsyncStorage.getItem('id');
    // setDisable(true);
    const response = await axios.put(baseUrl + '/linkedtree', {
      "userId": id,
      "link": link,
      // "created_by": id,
    }, {
      headers: {
        "x-access-token": token
      }
    });
    console.log(response.data);
    return "LinkTee Updated sucess"
  } catch (error) {
    // console.log(error.message);
    return error.message;
  }
}

// export const HandlerUpdateConnections= async (link) => {

//   try {
//     console.log(link)
//     const token = await AsyncStorage.getItem('token');
//     const id = await AsyncStorage.getItem('id');
//     // setDisable(true);
//     const response = await axios.put(baseUrl + '/connections', {
//       "userId": id,
//       "linktree": link,   
//       // "created_by": id,
//     }, {
//       headers: {
//         "x-access-token": token
//       }
//     });
//     console.log(response.data);
//     return "Connections Updated sucess"
//   } catch (error) {
//     // console.log(error.message);
//     return error.message;
//   }
// }

export const HandlerAddSocial = async (link, platform) => {

  try {
    const token = await AsyncStorage.getItem('token');
    const id = await AsyncStorage.getItem('id');
    // setDisable(true);
    const response = await axios.post(baseUrl + '/social', {
      "userId": id,
      "link": link,
      "platform": platform
    }, {
      headers: {
        "x-access-token": token
      }
    });
    return "Socials Updated sucess"
  } catch (error) {
    return error.message;
  }
}

// export const HandlerDeleteSocial= async (socialId) => {

//   try {
//     console.log(socialId)
//     const token = await AsyncStorage.getItem('token');
//     const id = await AsyncStorage.getItem('id');
//     // setDisable(true);
//     const response = await axios.delete(baseUrl + '/social', {
//       // "userId": id,
//       "socialId": socialId,
//     }, {
//       headers: {
//         "x-access-token": token
//       }
//     });

//     return "Socials Deleted sucess"
//   } catch (error) {
//     return ("xdggfgcfg" + error.message);
//   }
// }


export const HandlerDeleteConnection = async (connectionId) => {

  try {
    // console.log(connectionId)
    const token = await AsyncStorage.getItem('token');
    console.log(token)

    // const id = await AsyncStorage.getItem('id');
    // setDisable(true);
    const response = await axios.delete(baseUrl + '/connection', {
      headers: {
        "x-access-token": token
      },
      data: {
        "connectionId": connectionId
      }
    });
    if (response) {
      console.log(token)
      return "connection Deleted sucess"
    }
    return "connection not Deleted "
  } catch (error) {
    return ("Delete Connection " + error.message);
  }
}

export const HandlerDeleteSocial = async (socialId) => {

  try {
    // console.log(connectionId)
    const token = await AsyncStorage.getItem('token');
    console.log(token)

    // const id = await AsyncStorage.getItem('id');
    // setDisable(true);
    const response = await axios.delete(baseUrl + '/social', {
      headers: {
        "x-access-token": token
      },
      data: {
        "socialId": socialId
      }
    });
    if (response) {
      console.log(token)
      return "social Deleted sucess"
    }
    return "social not Deleted "
  } catch (error) {
    return ("Delete social " + error.message);
  }
}



export const HandlerAddConnections = async (name, pass) => {

  try {
    const token = await AsyncStorage.getItem('token');
    const id = await AsyncStorage.getItem('id');
    // setDisable(true);
    const response = await axios.post(baseUrl + '/connection', {
      "userId": id,
      "created_by": id,
      "name": name,
      "pass": pass
    }, {
      headers: {
        "x-access-token": token
      }
    });
    console.log(response.data);
    return "Connection Add sucess"
  } catch (error) {
    // console.log(error.message);
    return error.message;
  }
}

// function HandlerDeleteConnection(id) {
//   const url = `${baseUrl}/connection`;

//   axios.delete(url,{connectionId :id } {
//     {

//     },
//     headers: {
//       "x-access-token": token
//     },

//     // You can include credentials like cookies, omit if not needed
//     withCredentials: true,
//   })
//   .then(response => {
//     console.log('Delete successful:', response.data);
//     // Perform any additional actions after successful delete
//   })
//   .catch(error => {
//     console.error('Error during delete request:', error);
//     // Handle errors appropriately
//   });
// }
// export const HandlerAddSocial = async (link, platform) => {

//   try {
//     const token = await AsyncStorage.getItem('token');
//     const id = await AsyncStorage.getItem('id');
//     // setDisable(true);
//     const response = await axios.post(baseUrl + '/social', {
//       "userId": id,
//       "created_by": id,
//       "link": link,
//       "platform": platform
//     }, {
//       headers: {
//         "x-access-token": token
//       }
//     });
//     console.log(response.data);
//     return "Social Add sucess"
//   } catch (error) {
//     // console.log(error.message);
//     return error.message;
//   }
// }

// const HandlerLoginWithCard = async (password) => {
//   try {
//     await AsyncStorage.clear();
//     setDisable(true);
//     const response = await axios.post(baseUrl + '/auth/cardIn', {
//       "userId": userId,
//       "password":password,
//     });
//     console.log(response.data);
//     if (response.data) {
//       const user = response.data;
//       await AsyncStorage.setItem('token', user.accessToken);
//       // await AsyncStorage.setItem('id', user.id);
//       // await AsyncStorage.setItem('name', user.firstName + ' ' + user.lastName);

//       // signIn(user.accessToken);
//       const token = await AsyncStorage.getItem('token');
//       console.log(token);
//       // setError("");
//       // navigateToMainScreen();
//     } else {
//       setError("Invalid credentials");
//     }
//   } catch (error) {
//     console.error('Login failed', error);
//     if (error.response && error.response.data) {
//       setError(error.response.data.message);
//     } else {
//       setError('Login failed');
//     }
//   } finally {
//     setDisable(false);
//   }
// };

// export const HandlerActionApi = async () => {

//   try {
//     const token = await AsyncStorage.getItem('token');
//     console.log(token)
//     const response = await axios.delete(baseUrl + '/actions', {
//       headers: {
//         "x-access-token": token
//       },
//       data: {
//         "socialId": socialId
//       }
//     });
//     if (response) {
//       console.log(token)
//       return "Action Changed sucess"
//     }
//     return "Action not Changed"
//   } catch (error) {
//     return ("Action Changed " + error.message);
//   }
// }

export const HandlerActionApi = async (link, type) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const id = await AsyncStorage.getItem('id');
    // setDisable(true);
    const cardId = await AsyncStorage.getItem('cardId');
    console.log(link)
    console.log(cardId)

    const response = await axios.post(baseUrl + '/action', {
      "cardId": cardId,
      "action": link,
      "actionType": type,
      "created_by": id,
      "status": true
    }, {
      headers: {
        "x-access-token": token
      }
    });
    console.log(response.data)
    return "Action Updated sucess"
  } catch (error) {
    return error.message;
  }
}

// export const HandlerLoginWithCard = async (cardId) => {
//   try {
//     console.log("handler Running")
//     // await AsyncStorage.clear();
//     // setDisable(true);
//     const response = await axios.post(baseUrl + '/auth/card', {
//       cardId: cardId,
//     });
//     console.log("jhjjj", response.data)
//   } catch (error) {
//     console.log(error.message)
//     return error.message;
//   }
// };

export const HandlerLoginWithCard = async (cardId) => {
  console.log("handler Running");
  // await AsyncStorage.clear();
  // setDisable(true);
  try {
    const response = await axios.post(baseUrl + '/auth/card', {
      cardId: cardId,

    })
    console.log("jhjjj", response.data);
    if (response.data) {
      const user = response.data;
      AsyncStorage.setItem('id', user.userId);
      AsyncStorage.setItem('name', user.firstName + ' ' + user.lastName);
      console.log("fdfgd")
      return true
    }
  }
  catch (error) {
    console.log("hhbb", error.message, error.response.data)
    return error.response.data.message
  }

  // .then(async (response) => {
  // .then((response) => {

  //   console.log("jhjjj", response.data);
  //   if (response.data) {
  //     const user = response.data;
  //     AsyncStorage.setItem('id', user.userId);
  //     AsyncStorage.setItem('name', user.firstName + ' ' + user.lastName);
  //     console.log("fdfgd")
  //     return true
  //   }
  //   // return response.data;
  // })
  // .catch((error) => {
  //   console.log("hhbb", error.message, error.response.data)
  //   return error.response.data.message
  // });
};


// export const HandlerLoginWithCard2 = (password, userId) => {
//   console.log("handler Running");
//   // await AsyncStorage.clear();
//   // setDisable(true);

//   axios.post(baseUrl + '/auth/cardIn', {
//     password: password,
//     userId: userId
//   })
//     .then(async (response) => {

//       console.log("jhjjj", response.data);
//       if (response.data && response.data.accessToken != null) {
//         const user = response.data;
//         await AsyncStorage.setItem('token', user.accessToken);
//         // await AsyncStorage.setItem('id', user.userId);
//         signIn(user.accessToken);
//         const token = await AsyncStorage.getItem('token');
//         console.log(token);
//         setError("");
//         navigateToMainScreen();
//       } else {
//         setError("Invalid credentials");
//       }

//     })
//     .catch((error) => {
//       console.log("hhbb", error.message)
//     });
// };


export const HandlerChangePass = async (oldPassword, newPassword) => {

  try {
    const token = await AsyncStorage.getItem('token');
    const email = await AsyncStorage.getItem('email');
    const response = await axios.post(baseUrl + '/user/change-password', {
      "email": email,
      "oldPassword": oldPassword,
      "newPassword": newPassword,
    }, {
      headers: {
        "x-access-token": token
      }
    });
    console.log(response.data)
    return true;
  } catch (error) {
    return error.response.data.message;
  }
}

export const HandlerActionget = async () => {

  try {
    const token = await AsyncStorage.getItem('token');
    const cardId = await AsyncStorage.getItem('cardId');
    console.log(cardId)
    console.log(token)

    const response = await axios.post(baseUrl + '/action-count', {
      "cardId": cardId,
    }, {
      headers: {
        "x-access-token": token
      }
    });
    console.log(response.data)
    return response.data;

  } catch (error) {
    return error.response.data.message;
  }
}


export const HandlerActionForget = async (email) => {

  try {
    const response = await axios.post(baseUrl + '/user/reset', {
      "email": email,
    });
    console.log(response.data)
    return response.data.message;
  } catch (error) {
    return error.response.data.message;
  }
}