/********************************************************
 * MAT259 PROJ.1   2D Matrix                            *
 *                                                      *
 * Junxiang Yao                                         *
 *                                                      *
 * Press G to show / hide the grid system.              *
 ********************************************************/
//layout
var horizontalMargin = 150;
var verticalMargin = 140;


//data matrix related
var table;
var rows, cols;
var dataMatrix = [];
var maxNum, minNum;
var cellWidth, cellHeight;
var r;

//color scheme
var colorBar;
var colorBarValue = [[241,197,0,255],
[241,197,0,255],
[240,198,0,255],
[240,198,0,255],
[240,198,0,255],
[240,198,2,255],
[240,198,2,255],
[240,198,2,255],
[240,198,2,255],
[240,198,2,255],
[240,198,2,255],
[240,198,2,255],
[240,198,2,255],
[239,197,1,255],
[240,198,2,255],
[240,198,2,255],
[239,196,3,255],
[240,197,4,255],
[240,197,4,255],
[237,197,3,255],
[238,198,4,255],
[237,197,3,255],
[237,197,3,255],
[237,197,3,255],
[237,197,3,255],
[237,197,3,255],
[238,198,4,255],
[238,198,4,255],
[237,197,4,255],
[237,197,4,255],
[236,197,4,255],
[236,197,4,255],
[236,197,4,255],
[236,197,4,255],
[236,197,4,255],
[236,197,4,255],
[236,197,4,255],
[236,197,6,255],
[236,197,6,255],
[235,196,5,255],
[236,197,6,255],
[236,197,6,255],
[236,197,6,255],
[235,196,5,255],
[234,197,5,255],
[234,197,5,255],
[234,196,7,255],
[234,196,7,255],
[234,196,7,255],
[234,196,7,255],
[234,196,7,255],
[234,196,7,255],
[234,196,7,255],
[234,196,7,255],
[232,197,7,255],
[232,197,7,255],
[234,196,9,255],
[234,196,9,255],
[232,197,9,255],
[232,197,9,255],
[232,197,9,255],
[232,197,9,255],
[232,197,9,255],
[232,197,9,255],
[232,197,11,255],
[231,195,10,255],
[230,196,10,255],
[230,196,10,255],
[230,196,10,255],
[230,196,10,255],
[230,196,10,255],
[230,196,10,255],
[230,196,10,255],
[230,196,10,255],
[230,196,10,255],
[230,196,11,255],
[228,197,11,255],
[228,197,11,255],
[228,197,11,255],
[228,197,11,255],
[228,197,11,255],
[228,197,11,255],
[227,195,12,255],
[227,195,12,255],
[227,195,12,255],
[226,196,12,255],
[226,196,12,255],
[226,196,12,255],
[226,196,14,255],
[226,196,14,255],
[226,196,14,255],
[226,196,14,255],
[226,196,14,255],
[226,196,14,255],
[226,196,14,255],
[225,195,13,255],
[225,196,14,255],
[224,195,13,255],
[224,195,15,255],
[225,196,16,255],
[225,196,16,255],
[225,196,16,255],
[224,195,15,255],
[224,195,15,255],
[224,195,16,255],
[224,195,16,255],
[222,195,16,255],
[222,195,16,255],
[222,195,16,255],
[222,195,16,255],
[222,195,16,255],
[222,195,16,255],
[220,195,17,255],
[221,196,18,255],
[221,196,18,255],
[221,196,18,255],
[221,196,18,255],
[220,195,17,255],
[220,194,19,255],
[220,194,19,255],
[220,194,19,255],
[220,194,19,255],
[218,195,19,255],
[218,195,19,255],
[218,195,19,255],
[218,195,19,255],
[218,195,21,255],
[218,195,21,255],
[218,195,21,255],
[218,195,21,255],
[218,195,21,255],
[216,194,20,255],
[216,194,20,255],
[216,194,22,255],
[216,194,22,255],
[216,194,22,255],
[216,194,22,255],
[216,194,22,255],
[216,194,22,255],
[215,195,22,255],
[215,194,23,255],
[215,194,23,255],
[215,194,23,255],
[214,193,22,255],
[215,194,23,255],
[215,194,23,255],
[214,193,22,255],
[212,194,24,255],
[212,194,24,255],
[212,194,24,255],
[212,194,24,255],
[212,194,24,255],
[212,194,24,255],
[212,194,26,255],
[212,194,26,255],
[211,194,26,255],
[211,194,26,255],
[211,194,26,255],
[210,193,25,255],
[210,193,27,255],
[211,194,28,255],
[210,193,27,255],
[210,193,27,255],
[211,194,28,255],
[208,194,27,255],
[208,194,27,255],
[208,193,28,255],
[208,193,28,255],
[208,193,28,255],
[208,193,28,255],
[207,192,27,255],
[207,194,28,255],
[207,194,28,255],
[207,194,30,255],
[207,194,30,255],
[206,193,29,255],
[206,193,29,255],
[206,193,29,255],
[206,193,29,255],
[205,193,31,255],
[205,193,31,255],
[205,193,31,255],
[205,193,31,255],
[205,193,31,255],
[204,192,32,255],
[204,192,32,255],
[204,192,32,255],
[203,193,33,255],
[202,192,32,255],
[202,192,32,255],
[202,192,33,255],
[202,192,33,255],
[201,193,33,255],
[201,193,33,255],
[201,193,33,255],
[201,193,33,255],
[201,193,33,255],
[201,192,35,255],
[201,192,35,255],
[201,192,35,255],
[201,192,35,255],
[201,192,35,255],
[199,193,35,255],
[198,192,36,255],
[198,192,36,255],
[198,192,36,255],
[198,192,36,255],
[198,192,36,255],
[197,192,36,255],
[197,192,38,255],
[197,192,38,255],
[197,192,38,255],
[197,192,38,255],
[197,192,38,255],
[197,192,38,255],
[197,192,38,255],
[196,191,39,255],
[196,191,39,255],
[195,191,39,255],
[195,191,39,255],
[195,191,39,255],
[193,192,40,255],
[193,192,40,255],
[193,192,40,255],
[193,192,40,255],
[193,192,40,255],
[193,192,40,255],
[192,191,41,255],
[192,191,41,255],
[193,192,42,255],
[191,191,41,255],
[191,191,41,255],
[191,191,43,255],
[191,191,43,255],
[191,191,43,255],
[191,191,43,255],
[191,191,43,255],
[189,192,43,255],
[189,191,45,255],
[189,191,45,255],
[188,190,44,255],
[188,190,44,255],
[188,190,44,255],
[188,190,44,255],
[187,191,44,255],
[187,191,45,255],
[187,191,45,255],
[187,191,45,255],
[187,191,45,255],
[187,191,45,255],
[187,190,47,255],
[186,191,47,255],
[186,191,47,255],
[186,191,47,255],
[186,191,47,255],
[186,191,47,255],
[185,190,48,255],
[185,190,48,255],
[183,190,48,255],
[183,190,48,255],
[183,190,48,255],
[183,190,50,255],
[183,190,50,255],
[183,190,50,255],
[183,190,50,255],
[183,190,50,255],
[182,191,50,255],
[182,190,52,255],
[181,189,51,255],
[181,189,51,255],
[181,189,51,255],
[181,189,51,255],
[180,191,53,255],
[179,190,52,255],
[179,190,52,255],
[179,190,52,255],
[179,190,52,255],
[179,190,52,255],
[177,189,53,255],
[177,189,53,255],
[178,190,54,255],
[177,189,53,255],
[177,189,53,255],
[177,189,53,255],
[177,189,53,255],
[177,189,55,255],
[177,189,55,255],
[177,189,55,255],
[176,190,55,255],
[176,189,57,255],
[175,188,56,255],
[175,188,56,255],
[176,189,57,255],
[174,190,57,255],
[173,189,56,255],
[173,189,57,255],
[173,189,57,255],
[173,189,57,255],
[173,189,57,255],
[173,189,57,255],
[173,189,57,255],
[172,189,59,255],
[172,189,59,255],
[172,189,59,255],
[172,189,59,255],
[171,188,58,255],
[171,188,58,255],
[169,188,60,255],
[169,188,60,255],
[169,188,60,255],
[169,188,60,255],
[169,188,60,255],
[169,188,60,255],
[169,188,60,255],
[169,188,62,255],
[168,189,62,255],
[167,188,61,255],
[167,188,61,255],
[167,187,62,255],
[167,187,62,255],
[167,187,62,255],
[167,187,62,255],
[167,187,62,255],
[167,187,64,255],
[166,188,64,255],
[165,187,63,255],
[166,188,64,255],
[166,188,64,255],
[166,188,64,255],
[166,188,64,255],
[163,187,65,255],
[163,187,65,255],
[163,187,65,255],
[163,187,65,255],
[163,187,65,255],
[163,187,65,255],
[162,187,67,255],
[162,187,67,255],
[162,187,67,255],
[162,187,67,255],
[161,186,66,255],
[161,186,68,255],
[161,186,68,255],
[161,186,68,255],
[159,187,68,255],
[160,188,69,255],
[159,186,69,255],
[159,186,69,255],
[159,186,69,255],
[159,186,69,255],
[158,187,69,255],
[158,187,69,255],
[158,187,71,255],
[157,186,70,255],
[157,186,70,255],
[157,186,70,255],
[157,186,70,255],
[156,186,72,255],
[156,186,72,255],
[156,186,72,255],
[156,186,72,255],
[156,186,72,255],
[156,186,72,255],
[156,186,72,255],
[155,185,73,255],
[154,187,74,255],
[154,187,74,255],
[154,187,74,255],
[153,186,73,255],
[153,185,74,255],
[153,185,74,255],
[153,185,74,255],
[152,186,74,255],
[152,186,74,255],
[151,185,73,255],
[152,186,76,255],
[152,186,76,255],
[152,186,76,255],
[151,185,75,255],
[151,185,75,255],
[149,185,75,255],
[149,185,77,255],
[149,185,77,255],
[149,185,77,255],
[149,185,77,255],
[149,185,77,255],
[149,185,77,255],
[148,185,79,255],
[148,185,79,255],
[147,184,78,255],
[147,184,78,255],
[147,184,78,255],
[147,184,79,255],
[147,184,79,255],
[146,185,79,255],
[146,185,79,255],
[146,185,79,255],
[146,185,79,255],
[146,184,81,255],
[146,184,81,255],
[145,183,80,255],
[145,183,80,255],
[145,183,80,255],
[143,184,80,255],
[143,184,82,255],
[143,184,82,255],
[143,184,82,255],
[143,184,82,255],
[143,184,82,255],
[142,183,81,255],
[142,184,82,255],
[142,184,84,255],
[141,183,83,255],
[141,183,83,255],
[141,183,83,255],
[141,183,83,255],
[139,183,85,255],
[139,183,85,255],
[141,183,85,255],
[139,183,85,255],
[139,183,85,255],
[139,183,85,255],
[139,183,86,255],
[139,183,86,255],
[139,183,86,255],
[138,182,85,255],
[137,183,85,255],
[138,184,86,255],
[137,183,85,255],
[137,182,87,255],
[137,182,87,255],
[137,182,87,255],
[136,181,86,255],
[136,181,86,255],
[136,181,86,255],
[135,182,88,255],
[135,182,88,255],
[135,182,88,255],
[135,182,88,255],
[135,182,88,255],
[135,182,88,255],
[135,182,88,255],
[135,181,90,255],
[133,182,90,255],
[133,182,90,255],
[133,182,90,255],
[133,182,90,255],
[133,182,90,255],
[133,182,90,255],
[132,181,90,255],
[132,181,90,255],
[131,182,90,255],
[131,182,90,255],
[131,182,90,255],
[131,182,90,255],
[130,181,89,255],
[131,181,92,255],
[131,181,92,255],
[131,181,92,255],
[131,181,92,255],
[129,182,92,255],
[128,181,93,255],
[128,181,93,255],
[128,181,93,255],
[128,181,93,255],
[129,182,94,255],
[129,182,94,255],
[128,180,95,255],
[128,180,95,255],
[127,181,95,255],
[127,181,95,255],
[127,181,95,255],
[127,181,95,255],
[127,181,95,255],
[127,181,95,255],
[127,181,97,255],
[127,181,97,255],
[126,180,96,255],
[126,180,96,255],
[126,180,96,255],
[125,180,96,255],
[125,180,97,255],
[125,180,97,255],
[125,180,97,255],
[125,180,97,255],
[125,180,97,255],
[125,180,97,255],
[125,180,99,255],
[122,180,96,255],
[122,179,98,255],
[122,179,98,255],
[122,179,98,255],
[122,179,98,255],
[122,179,98,255],
[122,179,98,255],
[122,179,100,255],
[122,179,100,255],
[122,179,100,255],
[121,178,99,255],
[121,180,100,255],
[121,180,100,255],
[120,179,99,255],
[120,179,99,255],
[120,179,99,255],
[121,179,102,255],
[121,179,102,255],
[121,179,102,255],
[120,178,101,255],
[120,178,101,255],
[118,179,102,255],
[117,178,101,255],
[117,178,101,255],
[117,178,101,255],
[118,179,102,255],
[118,179,102,255],
[117,178,101,255],
[117,178,101,255],
[117,177,103,255],
[116,178,103,255],
[116,178,103,255],
[116,178,103,255],
[116,178,103,255],
[116,178,103,255],
[116,178,103,255],
[116,178,103,255],
[115,177,104,255],
[115,177,104,255],
[116,178,105,255],
[114,178,104,255],
[115,179,105,255],
[114,178,104,255],
[114,178,104,255],
[115,179,105,255],
[114,178,104,255],
[114,177,106,255],
[114,177,106,255],
[113,176,105,255],
[114,177,106,255],
[114,177,106,255],
[114,177,106,255],
[114,177,106,255],
[111,177,105,255],
[112,178,107,255],
[112,178,107,255],
[111,177,106,255],
[111,177,106,255],
[111,177,106,255],
[111,177,106,255],
[111,177,106,255],
[111,177,106,255],
[111,176,108,255],
[111,176,108,255],
[111,176,108,255],
[111,176,108,255],
[111,176,108,255],
[111,176,108,255],
[110,177,108,255],
[109,176,107,255],
[109,176,109,255],
[109,176,109,255],
[109,176,109,255],
[109,176,109,255],
[109,176,109,255],
[109,176,109,255],
[109,176,109,255],
[109,176,109,255],
[109,175,111,255],
[109,175,111,255],
[107,176,111,255],
[106,175,110,255],
[106,175,110,255],
[106,175,110,255],
[106,175,110,255],
[106,175,110,255],
[106,175,110,255],
[106,175,110,255],
[106,175,112,255],
[106,175,112,255],
[106,175,112,255],
[106,175,112,255],
[106,175,112,255],
[106,175,112,255],
[106,175,112,255],
[105,175,112,255],
[104,174,112,255],
[104,174,112,255],
[104,174,112,255],
[104,174,112,255],
[104,174,112,255],
[104,174,112,255],
[104,174,112,255],
[103,173,111,255],
[104,174,114,255],
[104,174,114,255],
[103,173,113,255],
[103,173,113,255],
[102,173,113,255],
[102,173,113,255],
[102,173,113,255],
[102,173,113,255],
[102,173,115,255],
[102,173,115,255],
[102,173,115,255],
[101,172,114,255],
[101,172,114,255],
[102,173,115,255],
[102,173,115,255],
[101,172,114,255],
[101,172,116,255],
[101,172,116,255],
[99,172,116,255],
[99,172,116,255],
[99,172,116,255],
[99,172,116,255],
[99,172,116,255],
[99,172,116,255],
[99,172,117,255],
[98,171,116,255],
[98,171,116,255],
[99,172,117,255],
[98,171,116,255],
[98,171,116,255],
[98,171,116,255],
[98,171,116,255],
[97,171,118,255],
[97,171,118,255],
[97,171,118,255],
[97,171,118,255],
[97,171,118,255],
[97,171,118,255],
[97,171,118,255],
[97,171,118,255],
[96,170,117,255],
[96,170,117,255],
[96,170,119,255],
[96,170,119,255],
[96,170,119,255],
[96,170,119,255],
[94,171,119,255],
[94,171,119,255],
[94,171,119,255],
[94,171,119,255],
[94,171,119,255],
[93,169,120,255],
[93,169,120,255],
[93,169,120,255],
[93,169,120,255],
[93,169,120,255],
[93,169,120,255],
[93,169,120,255],
[93,169,120,255],
[93,169,120,255],
[93,169,122,255],
[93,169,122,255],
[91,169,121,255],
[91,169,121,255],
[91,169,121,255],
[91,169,121,255],
[91,169,121,255],
[91,169,121,255],
[91,169,121,255],
[91,169,121,255],
[91,168,122,255],
[91,168,122,255],
[91,168,122,255],
[90,167,121,255],
[90,167,121,255],
[90,167,121,255],
[90,167,121,255],
[90,167,121,255],
[89,168,123,255],
[89,168,123,255],
[90,167,123,255],
[89,168,123,255],
[89,168,123,255],
[88,167,122,255],
[89,168,123,255],
[89,168,123,255],
[88,167,122,255],
[88,167,122,255],
[88,166,124,255],
[88,166,124,255],
[88,166,124,255],
[88,166,124,255],
[88,166,124,255],
[88,166,124,255],
[86,167,124,255],
[86,167,124,255],
[85,166,123,255],
[85,166,123,255],
[85,166,123,255],
[85,166,123,255],
[85,166,125,255],
[85,166,125,255],
[85,166,125,255],
[85,166,125,255],
[85,166,125,255],
[85,166,125,255],
[85,166,125,255],
[85,166,125,255],
[85,165,126,255],
[85,165,126,255],
[84,164,125,255],
[84,164,125,255],
[84,164,125,255],
[84,164,125,255],
[84,164,125,255],
[83,165,125,255],
[83,165,125,255],
[83,165,127,255],
[82,164,126,255],
[82,164,126,255],
[83,165,127,255],
[83,165,127,255],
[82,164,126,255],
[82,164,126,255],
[82,164,126,255],
[82,164,126,255],
[82,164,126,255],
[82,164,126,255],
[82,164,128,255],
[82,164,128,255],
[82,164,128,255],
[82,164,128,255],
[82,164,128,255],
[81,163,127,255],
[81,163,127,255],
[81,163,127,255],
[79,163,127,255],
[79,163,127,255],
[79,163,127,255],
[79,163,129,255],
[79,163,129,255],
[79,163,129,255],
[79,163,129,255],
[79,163,129,255],
[79,163,129,255],
[78,162,128,255],
[78,162,128,255],
[78,162,128,255],
[78,162,128,255],
[78,162,129,255],
[78,162,129,255],
[78,162,129,255],
[77,162,129,255],
[77,162,129,255],
[77,162,129,255],
[77,162,129,255],
[76,161,128,255],
[76,161,128,255],
[76,161,130,255],
[76,161,130,255],
[76,161,130,255],
[76,161,130,255],
[76,161,130,255],
[76,161,130,255],
[76,161,130,255],
[76,161,130,255],
[76,161,130,255],
[76,161,130,255],
[75,160,129,255],
[75,160,129,255],
[75,160,131,255],
[75,160,131,255],
[75,160,131,255],
[75,160,131,255],
[75,160,131,255],
[75,160,131,255],
[75,160,131,255],
[75,160,131,255],
[75,160,131,255],
[75,160,131,255],
[73,159,130,255],
[73,159,130,255],
[73,159,132,255],
[74,160,133,255],
[73,159,132,255],
[73,159,132,255],
[73,159,132,255],
[73,159,132,255],
[73,159,132,255],
[73,159,132,255],
[73,159,132,255],
[72,158,131,255],
[73,159,134,255],
[73,159,134,255],
[73,159,134,255],
[72,158,133,255],
[72,158,133,255],
[72,158,133,255],
[72,158,133,255],
[71,157,132,255],
[72,158,133,255],
[72,158,133,255],
[72,158,133,255],
[72,158,133,255],
[72,157,134,255],
[71,156,133,255],
[72,157,134,255],
[71,156,133,255],
[71,156,133,255],
[71,156,133,255],
[69,157,133,255],
[69,157,133,255],
[69,157,133,255],
[69,157,133,255],
[69,157,133,255],
[69,157,133,255],
[69,157,133,255],
[69,157,133,255],
[69,157,135,255],
[68,156,134,255],
[68,156,134,255],
[68,156,134,255],
[68,156,134,255],
[68,156,134,255],
[68,156,134,255],
[68,156,134,255],
[68,156,134,255],
[67,155,133,255],
[67,154,135,255],
[67,154,135,255],
[68,155,136,255],
[68,155,136,255],
[68,155,136,255],
[67,154,135,255],
[67,154,135,255],
[67,154,135,255],
[67,154,135,255],
[67,154,135,255],
[67,154,135,255],
[67,154,135,255],
[67,154,135,255],
[67,154,135,255],
[66,153,136,255],
[66,153,136,255],
[65,154,136,255],
[65,154,136,255],
[65,154,136,255],
[65,154,136,255],
[66,153,136,255],
[66,153,136,255],
[65,154,136,255],
[65,154,136,255],
[65,154,136,255],
[65,154,136,255],
[64,153,135,255],
[64,153,135,255],
[64,152,136,255],
[65,153,137,255],
[64,152,136,255],
[64,152,136,255],
[64,152,136,255],
[64,152,136,255],
[64,152,136,255],
[63,151,135,255],
[63,151,135,255],
[63,151,135,255],
[64,152,136,255],
[64,152,136,255],
[64,152,136,255],
[63,151,137,255],
[63,151,137,255],
[63,151,137,255],
[63,151,137,255],
[63,151,137,255],
[63,151,137,255],
[63,151,137,255],
[63,151,137,255],
[63,151,137,255],
[62,150,136,255],
[62,150,136,255],
[62,150,136,255],
[62,150,136,255],
[62,150,136,255],
[62,150,136,255],
[62,150,138,255],
[62,150,138,255],
[62,150,138,255],
[62,150,138,255],
[62,150,138,255],
[62,150,138,255],
[62,150,138,255],
[62,150,138,255],
[61,149,137,255],
[61,149,137,255],
[59,149,137,255],
[59,149,137,255],
[62,150,138,255],
[61,149,137,255],
[61,148,139,255],
[61,148,139,255],
[60,147,138,255],
[61,148,139,255],
[59,149,139,255],
[59,149,139,255],
[61,148,139,255],
[61,148,139,255],
[60,147,138,255],
[60,147,138,255],
[60,147,138,255],
[60,147,138,255],
[60,147,138,255],
[60,147,138,255],
[60,147,138,255],
[60,147,138,255],
[60,147,138,255],
[60,147,139,255],
[60,147,139,255],
[60,147,139,255],
[60,147,139,255],
[59,146,138,255],
[59,146,138,255],
[59,146,138,255],
[59,146,138,255],
[59,146,138,255],
[59,146,138,255],
[59,146,138,255],
[59,146,138,255],
[59,146,138,255],
[59,146,138,255],
[59,146,138,255],
[59,146,140,255],
[59,146,140,255],
[58,145,139,255],
[59,146,140,255],
[58,145,139,255],
[58,145,139,255],
[58,145,139,255],
[58,145,139,255],
[58,145,139,255],
[58,145,139,255],
[58,145,139,255],
[58,145,139,255],
[57,144,138,255],
[58,145,139,255],
[58,145,139,255],
[57,144,138,255],
[57,144,138,255],
[57,144,138,255],
[57,143,140,255],
[57,143,140,255],
[57,143,140,255],
[57,143,140,255],
[57,143,140,255],
[57,143,140,255],
[57,143,140,255],
[57,143,140,255],
[57,143,140,255],
[57,143,140,255],
[56,142,139,255],
[56,142,139,255],
[56,142,139,255],
[56,142,139,255],
[56,142,139,255],
[56,142,139,255],
[56,142,139,255],
[56,142,139,255],
[56,142,141,255],
[56,142,141,255],
[56,142,141,255],
[56,142,141,255],
[56,142,141,255],
[56,142,141,255],
[56,142,141,255],
[56,142,141,255],
[56,142,141,255],
[56,142,141,255],
[55,141,140,255],
[55,141,140,255],
[55,141,140,255],
[55,141,140,255],
[55,141,140,255],
[55,141,140,255],
[55,141,140,255],
[55,141,140,255],
[55,141,140,255],
[55,141,140,255],
[55,141,142,255],
[55,141,142,255],
[54,140,141,255],
[54,140,141,255],
[54,140,141,255],
[54,140,141,255],
[54,140,141,255],
[54,140,141,255],
[54,140,141,255],
[54,140,141,255],
[54,140,141,255],
[54,140,141,255],
[54,140,141,255],
[53,139,140,255],
[54,140,141,255],
[54,140,141,255],
[53,139,140,255],
[53,139,140,255],
[53,139,140,255],
[53,139,140,255],
[54,139,142,255],
[53,138,141,255],
[53,138,141,255],
[53,138,141,255],
[53,138,141,255],
[53,138,141,255],
[53,138,141,255],
[53,138,141,255],
[52,137,140,255],
[53,138,141,255],
[54,137,141,255],
[54,137,141,255],
[53,136,140,255],
[53,136,140,255],
[53,136,140,255],
[53,136,140,255],
[53,136,140,255],
[53,136,140,255],
[53,136,140,255],
[53,136,140,255],
[53,136,140,255],
[53,136,140,255],
[53,136,140,255],
[53,136,140,255],
[53,136,140,255],
[52,135,141,255],
[53,136,140,255],
[52,135,139,255],
[53,136,142,255],
[53,136,142,255],
[52,135,141,255],
[51,134,140,255],
[52,135,141,255],
[53,136,142,255],
[52,135,141,255],
[52,135,141,255],
[52,135,141,255],
[52,135,141,255],
[52,135,141,255],
[52,135,141,255],
[52,135,141,255],
[52,135,141,255],
[52,135,141,255],
[52,135,141,255],
[51,134,140,255],
[51,134,140,255],
[51,134,140,255],
[51,134,140,255],
[51,134,140,255],
[51,134,140,255],
[51,134,142,255],
[51,134,142,255],
[53,133,142,255],
[53,133,142,255],
[53,133,142,255],
[53,133,142,255],
[53,133,142,255],
[53,133,142,255],
[53,133,142,255],
[53,133,142,255],
[53,133,142,255],
[53,133,142,255],
[53,133,142,255],
[53,133,142,255],
[52,132,141,255],
[52,132,141,255],
[53,133,142,255],
[52,132,141,255],
[52,132,141,255],
[52,132,141,255],
[52,132,141,255],
[52,132,141,255],
[52,132,141,255],
[52,132,141,255],
[52,132,141,255],
[52,132,141,255],
[52,132,141,255],
[52,132,141,255],
[52,130,140,255],
[52,130,140,255],
[53,131,141,255],
[53,131,141,255],
[52,130,140,255],
[53,131,141,255],
[52,130,140,255],
[52,130,140,255],
[53,131,141,255],
[52,130,140,255],
[52,130,142,255],
[52,130,142,255],
[52,130,142,255],
[52,130,140,255],
[52,130,140,255],
[52,130,140,255],
[52,130,140,255],
[52,130,140,255],
[53,130,140,255],
[53,129,142,255],
[52,128,141,255],
[53,129,142,255],
[53,129,142,255],
[52,128,141,255],
[52,128,141,255],
[52,128,141,255],
[52,128,141,255],
[52,128,141,255],
[52,129,139,255],
[52,129,139,255],
[52,128,141,255],
[52,128,141,255],
[52,128,141,255],
[52,128,141,255],
[52,128,141,255],
[52,128,141,255],
[52,128,141,255],
[52,128,141,255],
[54,128,141,255],
[54,128,141,255],
[54,128,141,255],
[54,128,141,255],
[53,127,140,255],
[54,128,141,255],
[54,128,141,255],
[53,127,140,255],
[53,127,140,255],
[53,127,140,255],
[53,127,140,255],
[54,128,141,255],
[53,127,140,255],
[54,126,140,255],
[53,127,140,255],
[53,127,140,255],
[53,127,140,255],
[54,126,140,255],
[54,126,140,255],
[54,126,140,255],
[54,126,140,255],
[54,126,140,255],
[54,126,140,255],
[54,126,140,255],
[54,126,140,255],
[54,126,140,255],
[54,126,140,255],
[54,126,140,255],
[54,126,140,255],
[53,125,139,255],
[53,125,139,255],
[53,125,139,255],
[55,124,139,255],
[55,124,139,255],
[55,124,139,255],
[55,124,139,255],
[55,124,139,255],
[55,124,139,255],
[55,124,139,255],
[55,124,139,255],
[55,124,139,255],
[55,124,139,255],
[55,124,139,255],
[56,123,139,255],
[56,123,139,255],
[56,123,139,255],
[56,123,139,255],
[56,123,139,255],
[56,123,139,255],
[55,122,138,255],
[55,122,138,255],
[55,122,138,255],
[55,122,138,255],
[55,122,138,255],
[55,122,138,255],
[55,122,138,255],
[56,123,139,255],
[56,122,138,255],
[56,122,138,255],
[56,122,138,255],
[56,122,138,255],
[56,122,138,255],
[56,122,138,255],
[56,122,138,255],
[56,122,138,255],
[56,122,138,255],
[56,122,138,255],
[58,121,138,255],
[58,121,138,255],
[58,121,138,255],
[56,122,138,255],
[57,120,137,255],
[57,120,137,255],
[57,120,137,255],
[57,120,137,255],
[57,120,137,255],
[57,120,137,255],
[57,120,137,255],
[57,120,137,255],
[57,120,137,255],
[58,119,137,255],
[58,119,137,255],
[58,119,137,255],
[58,119,137,255],
[58,119,137,255],
[58,119,137,255],
[58,119,137,255],
[58,119,137,255],
[58,119,137,255],
[58,119,137,255],
[60,119,137,255],
[60,119,137,255],
[60,119,137,255],
[59,118,136,255],
[59,118,136,255],
[59,118,136,255],
[60,119,137,255],
[59,118,136,255],
[59,118,136,255],
[59,118,136,255],
[59,118,136,255],
[59,118,136,255],
[59,118,136,255],
[59,118,136,255],
[60,117,136,255],
[60,117,136,255],
[60,117,136,255],
[60,117,136,255],
[60,117,136,255],
[60,117,136,255],
[60,117,136,255],
[61,116,136,255],
[61,116,136,255],
[61,116,136,255],
[61,117,134,255],
[60,116,133,255],
[60,116,133,255],
[60,116,133,255],
[60,116,133,255],
[60,116,133,255],
[60,116,133,255],
[60,116,133,255],
[60,116,133,255],
[62,115,133,255],
[62,115,133,255],
[62,115,133,255],
[62,115,133,255],
[62,115,133,255],
[62,115,133,255],
[62,115,133,255],
[62,115,133,255],
[62,115,133,255],
[62,115,133,255],
[62,115,133,255],
[63,114,133,255],
[63,114,133,255],
[63,114,133,255],
[63,114,133,255],
[62,113,132,255],
[63,114,133,255],
[63,114,133,255],
[62,113,132,255],
[62,113,132,255],
[65,113,133,255],
[64,112,132,255],
[64,112,132,255],
[64,112,132,255],
[64,112,132,255],
[64,112,132,255],
[64,112,132,255],
[64,112,132,255],
[64,112,132,255],
[64,112,132,255],
[64,112,132,255],
[65,112,132,255],
[65,112,132,255],
[65,112,132,255],
[65,112,132,255],
[65,112,132,255],
[65,112,132,255],
[65,112,132,255],
[65,112,132,255],
[65,112,132,255],
[65,112,132,255],
[66,111,132,255],
[66,111,132,255],
[65,110,131,255],
[66,111,132,255],
[65,110,131,255],
[65,110,131,255],
[65,110,131,255],
[65,110,131,255],
[67,109,131,255],
[67,109,131,255],
[67,109,131,255],
[67,109,131,255],
[67,109,131,255],
[67,109,131,255],
[67,110,129,255],
[67,110,129,255],
[67,110,129,255],
[67,110,129,255],
[67,110,129,255],
[68,109,129,255],
[68,109,129,255],
[68,109,129,255],
[68,109,129,255],
[68,109,129,255],
[68,109,129,255],
[67,108,128,255],
[67,108,128,255],
[67,108,128,255],
[70,108,129,255],
[69,107,128,255],
[69,107,128,255],
[69,107,128,255],
[69,107,128,255],
[69,107,128,255],
[69,107,128,255],
[69,107,128,255],
[70,106,128,255],
[70,106,128,255],
[70,106,128,255],
[70,106,128,255],
[70,106,128,255],
[70,106,128,255],
[70,106,128,255],
[70,106,128,255],
[70,106,128,255],
[69,105,127,255],
[70,106,128,255],
[70,106,128,255],
[71,106,128,255],
[71,106,128,255],
[71,106,128,255],
[71,106,128,255],
[71,106,128,255],
[71,106,128,255],
[70,105,127,255],
[70,105,127,255],
[72,104,127,255],
[72,104,127,255],
[72,104,127,255],
[72,104,127,255],
[72,104,127,255],
[72,104,127,255],
[72,104,127,255],
[72,104,127,255],
[72,104,127,255],
[72,104,127,255],
[73,104,125,255],
[73,104,125,255],
[73,104,125,255],
[73,104,125,255],
[73,104,125,255],
[73,104,125,255],
[73,104,125,255],
[73,104,125,255],
[73,104,125,255],
[73,104,125,255],
[75,103,125,255],
[75,103,125,255],
[75,103,125,255],
[74,102,124,255],
[74,102,124,255],
[74,102,124,255],
[74,102,124,255],
[74,102,124,255],
[74,102,124,255],
[75,101,124,255],
[75,101,124,255],
[75,101,124,255],
[75,101,124,255],
[75,101,124,255],
[75,101,124,255],
[75,101,124,255],
[75,101,124,255],
[75,101,124,255],
[76,100,124,255],
[76,100,124,255],
[76,100,124,255],
[76,100,124,255],
[76,100,124,255],
[76,100,124,255],
[76,100,124,255],
[76,100,124,255],
[76,100,124,255],
[78,100,124,255],
[78,100,124,255],
[78,100,124,255],
[78,100,123,255],
[78,100,123,255],
[77,99,122,255],
[77,99,122,255],
[78,100,123,255],
[78,100,123,255],
[78,98,122,255],
[78,98,122,255],
[79,99,123,255],
[78,98,122,255],
[78,98,122,255],
[78,98,122,255],
[78,98,122,255],
[78,98,122,255],
[78,98,122,255],
[78,98,122,255],
[80,98,122,255],
[80,98,122,255],
[80,98,122,255],
[80,98,122,255],
[80,98,122,255],
[80,98,122,255],
[80,98,122,255],
[80,98,122,255],
[80,98,122,255],
[80,98,122,255],
[80,98,122,255],
[81,97,122,255],
[81,97,122,255],
[80,96,121,255],
[81,97,122,255],
[80,96,121,255],
[81,97,122,255],
[81,97,122,255],
[80,96,121,255],
[80,96,121,255],
[81,95,121,255],
[81,95,121,255],
[81,95,121,255],
[81,95,121,255],
[81,96,119,255],
[81,96,119,255],
[81,96,119,255],
[81,96,119,255],
[81,96,119,255],
[83,95,119,255],
[83,95,119,255],
[83,95,119,255],
[83,95,119,255],
[83,95,119,255],
[83,95,119,255],
[83,95,119,255],
[83,95,119,255],
[83,95,119,255],
[83,95,119,255],
[84,94,119,255],
[84,94,119,255],
[84,94,119,255],
[84,94,119,255],
[84,94,119,255],
[84,94,119,255],
[83,93,118,255],
[84,94,119,255],
[83,93,118,255],
[83,93,118,255],
[84,94,119,255],
[84,94,119,255],
[83,93,118,255],
[85,92,118,255],
[85,92,118,255],
[85,92,118,255],
[85,92,118,255],
[86,93,119,255],
[86,92,118,255],
[86,92,118,255],
[86,92,118,255],
[86,92,116,255],
[86,92,116,255],
[86,92,116,255],
[86,92,116,255],
[86,92,116,255],
[86,92,116,255],
[86,92,116,255],
[86,92,116,255],
[86,92,116,255],
[86,92,116,255],
[87,91,116,255],
[87,91,116,255],
[87,91,116,255],
[87,91,116,255],
[87,91,116,255],
[87,91,116,255],
[86,90,115,255],
[87,91,116,255],
[87,91,116,255],
[87,91,116,255],
[87,91,116,255],
[87,91,116,255],
[88,90,115,255],
[88,90,115,255],
[88,90,115,255],
[88,90,115,255],
[89,91,116,255],
[89,91,116,255],
[89,91,116,255],
[88,90,115,255],
[88,90,115,255],
[88,90,115,255],
[88,90,115,255],
[89,89,115,255],
[89,89,115,255],
[89,89,115,255],
[89,89,115,255],
[89,89,115,255],
[89,89,115,255],
[89,89,115,255],
[89,89,115,255],
[89,89,115,255],
[89,89,115,255],
[89,89,115,255],
[89,89,113,255],
[89,89,113,255],
[91,89,113,255],
[91,89,113,255],
[91,89,113,255],
[90,88,112,255],
[91,89,113,255],
[91,89,113,255],
[91,89,113,255],
[91,89,113,255],
[91,89,113,255],
[91,89,113,255],
[91,89,113,255],
[91,89,113,255],
[91,89,113,255],
[91,89,113,255],
[91,87,112,255],
[91,87,112,255],
[91,87,112,255],
[91,87,112,255],
[92,88,113,255],
[91,87,112,255],
[91,87,112,255],
[91,87,112,255],
[92,88,113,255],
[92,88,113,255],
[91,87,112,255],
[91,87,112,255],
[92,86,112,255],
[92,86,112,255],
[92,86,112,255],
[92,86,112,255],
[92,86,112,255],
[92,86,112,255],
[92,86,112,255],
[92,86,112,255],
[92,86,112,255],
[92,86,112,255],
[92,86,112,255],
[92,86,112,255],
[92,86,112,255],
[92,86,112,255],
[92,86,112,255],
[94,85,112,255],
[94,85,112,255],
[94,85,112,255],
[94,85,112,255],
[94,85,112,255],
[94,85,112,255],
[93,84,111,255],
[94,85,112,255],
[94,85,112,255],
[94,85,112,255],
[94,85,112,255],
[95,85,112,255],
[95,85,112,255],
[95,85,112,255],
[95,85,112,255],
[95,85,112,255],
[94,84,111,255],
[94,84,109,255],
[95,85,110,255],
[95,85,110,255],
[94,84,109,255],
[94,84,109,255],
[94,84,109,255],
[94,84,109,255],
[94,84,109,255],
[94,84,109,255],
[94,84,109,255]];


//image array for the icons
var images = [];

//category of sports
var f = ["Basketball", "Volleyball", "Football",
  "Tennis", "Table Tennis", "Golf", "Baseball", "Weight Lifting\nTrack&Field\nGymnastics",
  "Cycling", "Motor", "Combat", "Ice&Snow", "Boating", "Swimming\n& Diving"];

// initialize the year
var startYear = 2006;

var grid = false;

function preload() {
  table = loadTable('./data/AllSports.csv','csv','header');
  colorBar = loadImage('./data/colorBar.jpg');
}

function windowResized(){
  if(windowWidth > 800){
    resizeCanvas(windowWidth,windowHeight);
  }
}

function setup() {
  // if(windowWidth > 800){
  //   createCanvas(windowWidth,windowHeight);
  // }else{
    createCanvas(windowWidth,windowHeight);
  // }

  //initialize the data
  print(table.get(0, 1));
  rows = table.getRowCount();
  cols = table.getColumnCount();
  maxNum = 0;
  minNum = 1000;
  for (var i = 0; i < cols-2; i++) {
    dataMatrix[i] = []; // create nested array
    for (var j = 0; j < rows; j++) {
      dataMatrix[i][j] = table.get(j, i+2);
    }
    //find the min value in the table
    if (max(dataMatrix[i]) > maxNum) {
      maxNum = max(dataMatrix[i]);
    }
    //find the min value in the table
    if (min(dataMatrix[i]) < minNum) {
      minNum = min(dataMatrix[i]);
    }
  }
  // print(minNum);
  for (var i = 0; i < cols-2; i++ ) {
    images[i] = loadImage( 'data/' + i + '.png' );
  }

  // for(var i = 0; i < (colorBar.width-2)*5/6; ++i){
  //   colorBarValue[i] = colorBar.get(i, colorBar.height/2);
  //   print(colorBarValue[i] + ",");
  // }
  // save(colorBarValue, 'my.txt');
}

function draw() {
  background(40);
  // image(colorBar,0,0);
  var c;

  //modifying the cell size according to window size
  cellWidth = (width - horizontalMargin*2)/rows;
  cellHeight = (height - verticalMargin*2)/cols;
  r = cellWidth/2;

  //set the position of the years
  for (var i=0; i<9; i++) {
    textAlign(CENTER, CENTER);
    fill(120);
    textSize(22);
    text(startYear+i, horizontalMargin + 12*cellWidth*i + cellWidth*6-3, height - verticalMargin + 8 );
    //brighten the background to emphasize the years when mouse is hovering
    if (mouseX>(horizontalMargin + 12*cellWidth*i + cellWidth/2-cellWidth+2)&&
        mouseX< (horizontalMargin + 12*cellWidth*i + cellWidth/2-cellWidth+2+12*cellWidth)
        && mouseY> 182&& mouseY < height-verticalMargin+48) {
        (height - verticalMargin - 20)
        fill(255, 10);
        noStroke();
        rect(horizontalMargin + 12*cellWidth*i + cellWidth/2-cellWidth+2, 180, cellWidth*12, height - verticalMargin*2 - 12);
      }
    }
    //draw 2D Matrix
    for (var i=0; i<cols-2; i++) {
      for (var j=0; j<rows; j++) {
        noStroke();
        var c = int(map(dataMatrix[i][j], minNum, maxNum, colorBarValue.length-1, 0));
        // console.log(brightness(colorBarValue[c]));
        // print(c);
        fill(colorBarValue[c]);
        //except for the color, size is another argument while displaying data
        //the brighter the color is, the larger the ellipse will be
        // var size = map(brightness(c), 0, 255, -3, 5);

        // var size = map(brightness(colorBarValue[c]), 255, 0, -16, 3);
        var size = map(brightness(colorBarValue[c]), 0, 100, -3, 5);
        ellipse(horizontalMargin + cellWidth*j + r/2, verticalMargin + cellHeight*i + cellHeight/2 +50, r*size, r*size);
      }
    }
    //draw the icons from the image array
    for (var i=0; i<cols-2; i++) {
      imageMode(CENTER);
      image(images[i], horizontalMargin-cellWidth*2, verticalMargin + cellHeight*i + cellHeight/2+50, 20, 20);
    }
    // set the text version of the name of the rows by the left side of the icons, and
    // display when the position of the mouse is appropriate.
    if (horizontalMargin-cellWidth*2-10<mouseX&&horizontalMargin-cellWidth*2+10>mouseX) {
      for (var i = 0; i < cols-2; i++) {
        if (mouseY>verticalMargin + cellHeight*i + cellHeight/2+40&&
            mouseY<verticalMargin + cellHeight*(i+1) + cellHeight/2+40) {
          textAlign(RIGHT, CENTER);
          fill(100);
          textSize(17);
          text(f[i], horizontalMargin-cellWidth*2-15, verticalMargin + cellHeight*i + cellHeight/2 + 47);
          }
        }
      }

    //header
    textAlign(LEFT, CENTER);
    fill(200);
    textSize(32);
    // text("How Reading Preferences of Books about",
    // horizontalMargin-cellWidth*2+15,50);
    // text("Sports in the Library Varies with Time",
    // horizontalMargin-cellWidth*2+15,90);
    // text("How Reading Preferences of Books about",
    // horizontalMargin-cellWidth*2+15,50);
    text("How Reading Preferences of Books about Sports Varies with Time",
    horizontalMargin-cellWidth*2+15,90);
    fill(120);
    textSize(20);
    text("Checkout times of the sports related books in the Seattle Public Library",
    horizontalMargin-cellWidth*2+15,130);
    noStroke();
    fill(120);
    rect(horizontalMargin-cellWidth*2-cellWidth*2+5,180,width - horizontalMargin*2+20, 2);

    //author
    textAlign(RIGHT, CENTER);
    textSize(12);
    text("Junxiang Yao", width - horizontalMargin-12 ,151);
    text("MAT259 PROJ 1b", width - horizontalMargin-12 ,167);

    //Colorbar
    textAlign(LEFT);
    textSize(12);
    text("Numbers of CheckOuts", horizontalMargin-cellWidth*2-cellWidth*2+5,height - verticalMargin + 48);

    imageMode(CENTER);
    image(colorBar,horizontalMargin-cellWidth*2-cellWidth*2 + 224,height - verticalMargin + 50,150,12);

    textAlign(LEFT);
    textSize(12);
    text("443",
    horizontalMargin-cellWidth*2-cellWidth*2+150,height - verticalMargin + 66);
    text("0", horizontalMargin-cellWidth*2-cellWidth*2+300,height - verticalMargin + 66);

}


//   if(grid){
//     gridSystem();
//   }
