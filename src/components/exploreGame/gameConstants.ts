export const SpriteDimensions = {
  right: [
    [
      {
        x: 0,
        y: 0,
        width: 200,
        height: 248,
      },
    ],
    [
      {
        x: 1346,
        y: 255,
        width: 164,
        height: 220,
      },
      {
        x: 1577,
        y: 265,
        width: 171,
        height: 220,
      },
      {
        x: 1809,
        y: 272,
        width: 156,
        height: 227,
      },
      {
        x: 0,
        y: 251,
        width: 130,
        height: 217,
      },
      {
        x: 191,
        y: 258,
        width: 144,
        height: 215,
      },
      {
        x: 405,
        y: 255,
        width: 171,
        height: 218,
      },
      {
        x: 627,
        y: 265,
        width: 140,
        height: 220,
      },
      {
        x: 860,
        y: 265,
        width: 171,
        height: 220,
      },
      {
        x: 1115,
        y: 255,
        width: 145,
        height: 218,
      },
    ],
  ],
  left: [
    [
      {
        x: 0,
        y: 752,
        width: 200,
        height: 246,
      },
    ],
    [
      {
        x: 455,
        y: 1006,
        width: 164,
        height: 220,
      },
      {
        x: 217,
        y: 1006,
        width: 171,
        height: 220,
      },
      {
        x: 0,
        y: 1023,
        width: 157,
        height: 227,
      },
      {
        x: 1835,
        y: 1002,
        width: 131,
        height: 217,
      },
      {
        x: 1630,
        y: 1009,
        width: 144,
        height: 215,
      },
      {
        x: 1389,
        y: 1006,
        width: 171,
        height: 218,
      },
      {
        x: 1198,
        y: 1016,
        width: 140,
        height: 220,
      },
      {
        x: 934,
        y: 1016,
        width: 171,
        height: 220,
      },
      {
        x: 705,
        y: 1006,
        width: 145,
        height: 218,
      },
    ],
  ],
};

export const platformSpriteDimensions = {
  centre: {
    x: 15,
    y: 15,
    width: 284,
    height: 325,
  },
  left: {
    x: 305,
    y: 15,
    width: 225,
    height: 150,
  },
  right: {
    x: 477,
    y: 177,
    width: 225,
    height: 150,
  },
};

export const platformDimensions = {
  centre: {
    heightPercentage: 0.3, // With this height can be calculated as screenHeight * heightPercentage
    aspectRatio: 275 / 325, // With this width can be calculated as Math.ceil(height * aspectRatio)
    xPercentage: 0.5, // With this x can be calculated as (screenWidth / 2 - width * xPercentage)
    yPercentage: 1.027, // With this y can be calculated as screenHeight * yPercentage
  },
  left: {
    heightPercentage: 0.15,
    aspectRatio: 225 / 150,
    xPercentage: 1.05,
    yPercentage: 1.39,
  },
  right: {
    heightPercentage: 0.17,
    aspectRatio: 225 / 150,
    xPercentage: -0.4,
    yPercentage: 1.3,
  },
  // other: [{
  //   heightPercentage: 0.3,
  //   aspectRatio: 275 / 325,
  //   xPercentage: 0.5,
  //   yPercentage: 0.7,
  // }]
};
