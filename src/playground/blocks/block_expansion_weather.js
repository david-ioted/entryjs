'use strict';

Entry.Expansion_Weather = {
    name: 'weather'
};

Entry.Expansion_Weather.getBlocks = function() {
    return {
            check_weather: {
                color: '#AEB8FF',
                skeleton: 'basic_boolean_field',
                statements: [],
                params: [
                    {
                        type: 'Dropdown',
                        options: [
                            [Lang.Blocks.date_yesterday, 'YESTERDAY'],
                            [Lang.Blocks.date_today, 'TODAY'],
                            [Lang.Blocks.date_tomorrow, 'TOMORROW'],
                            [Lang.Blocks.date_after_2_days, 'AFTER2DAYS'],
                            [Lang.Blocks.date_after_3_days, 'AFTER3DAYS'],
                            [Lang.Blocks.date_after_4_days, 'AFTER4DAYS'],
                            [Lang.Blocks.date_after_5_days, 'AFTER5DAYS'],
                            [Lang.Blocks.date_after_6_days, 'AFTER6DAYS'],
                        ],
                        value: 'TODAY',
                        fontSize: 11,
                        arrowColor: EntryStatic.ARROW_COLOR_VARIABLE,
                    },
                    {
                        type: 'Dropdown',
                        options: [
                            [Lang.Blocks.location_seoul, 'SEOUL'],
                            [Lang.Blocks.location_gangwon, 'GANGWON'],
                            [Lang.Blocks.location_gyeonggi, 'GYEONGGI'],
                            [Lang.Blocks.location_gyeongsangnam, 'GYEONGSANGNAM'],
                            [Lang.Blocks.location_gyeongsangbuk, 'GYEONGSANGBUK'],
                            [Lang.Blocks.location_gwangju, 'GWANGJU'],
                            [Lang.Blocks.location_daegu, 'DAEGU'],
                            [Lang.Blocks.location_daejeon, 'DAEJEON'],
                            [Lang.Blocks.location_busan, 'BUSAN'],
                            [Lang.Blocks.location_sejong, 'SEJONG'],
                            [Lang.Blocks.location_ulsan, 'ULSAN'],
                            [Lang.Blocks.location_incheon, 'INCHEON'],
                            [Lang.Blocks.location_jeollanam, 'JEOLLANAM'],
                            [Lang.Blocks.location_jeollabuk, 'JEOLLABUK'],
                            [Lang.Blocks.location_jeju, 'JEJU'],
                            [Lang.Blocks.location_chungcheongnam, 'CHUNGCHEONGNAM'],
                            [Lang.Blocks.location_chungcheongbuk, 'CHUNGCHEONGBUK'],
                        ],
                        value: 'SEOUL',
                        fontSize: 11,
                        arrowColor: EntryStatic.ARROW_COLOR_VARIABLE,
                    },
                    {
                        type: 'Dropdown',
                        options: [
                            [Lang.Blocks.EXPANSION_WEATHER_sunny, 'SUNNY'],
                            [Lang.Blocks.EXPANSION_WEATHER_partly_cloudy, 'PARTLY_CLOUDY'],
                            [Lang.Blocks.EXPANSION_WEATHER_mostly_cloudy, 'MOSTLY_CLOUDY'],
                            [Lang.Blocks.EXPANSION_WEATHER_cloudy, 'CLOUDY'],
                            [Lang.Blocks.EXPANSION_WEATHER_rainy, 'RAINY'],
                            [Lang.Blocks.EXPANSION_WEATHER_sleet, 'SLEET'],
                            [Lang.Blocks.EXPANSION_WEATHER_snowy, 'SNOWY'],
                        ],
                        value: 'SUNNY',
                        fontSize: 11,
                        arrowColor: EntryStatic.ARROW_COLOR_VARIABLE,
                    },
                ],
                events: {},
                def: {
                    params: ['TODAY', 'SEOUL', 'SUNNY'],
                    type: 'check_weather',
                },
                pyHelpDef: {
                    params: ['A&value', 'A&value', 'A&value'],
                    type: 'check_weather',
                },
                paramsKeyMap: {
                    DATE:0,
                    LOCATION:1,
                    WEATHER:2
                },
                class: 'weather',
                isNotFor: ['weather'],
                func: function (sprite, script) {
                    var date = Entry.WeatherForecast.getDate(script.getField('DATE', script));
                    var location = Entry.WeatherForecast.getLocation(script.getField('LOCATION', script));
                    var weather = script.getField('WEATHER', script);
                    var apiResult = Entry.WeatherForecast.mockData(date, "0600", location.x, location.y);

                    return Entry.WeatherForecast.checkWeather(apiResult.data.PTY, apiResult.data.SKY);
                },
                syntax: {
                    js: [],
                    py: [
                        {
                            syntax: 'Entry.check_weather(%1, %2, %3)',
                            blockType: 'param',
                            textParams: [
                                {
                                    type: 'Dropdown',
                                    options: [
                                        [Lang.Blocks.date_yesterday, 'YESTERDAY'],
                                        [Lang.Blocks.date_today, 'TODAY'],
                                        [Lang.Blocks.date_tomorrow, 'TOMORROW'],
                                        [Lang.Blocks.date_after_2_days, 'AFTER2DAYS'],
                                        [Lang.Blocks.date_after_3_days, 'AFTER3DAYS'],
                                        [Lang.Blocks.date_after_4_days, 'AFTER4DAYS'],
                                        [Lang.Blocks.date_after_5_days, 'AFTER5DAYS'],
                                        [Lang.Blocks.date_after_6_days, 'AFTER6DAYS'],
                                    ],
                                    value: 'TODAY',
                                    fontSize: 11,
                                    arrowColor: EntryStatic.ARROW_COLOR_VARIABLE,
                                    converter:Entry.block.converters.returnStringValue,
                                    codeMap:'Entry.CodeMap.Entry.get_date_for_weather[0]',
                                },
                                {
                                    type: 'Dropdown',
                                    options: [
                                        [Lang.Blocks.location_seoul, 'SEOUL'],
                                        [Lang.Blocks.location_gangwon, 'GANGWON'],
                                        [Lang.Blocks.location_gyeonggi, 'GYEONGGI'],
                                        [Lang.Blocks.location_gyeongsangnam, 'GYEONGSANGNAM'],
                                        [Lang.Blocks.location_gyeongsangbuk, 'GYEONGSANGBUK'],
                                        [Lang.Blocks.location_gwangju, 'GWANGJU'],
                                        [Lang.Blocks.location_daegu, 'DAEGU'],
                                        [Lang.Blocks.location_daejeon, 'DAEJEON'],
                                        [Lang.Blocks.location_busan, 'BUSAN'],
                                        [Lang.Blocks.location_sejong, 'SEJONG'],
                                        [Lang.Blocks.location_ulsan, 'ULSAN'],
                                        [Lang.Blocks.location_incheon, 'INCHEON'],
                                        [Lang.Blocks.location_jeollanam, 'JEOLLANAM'],
                                        [Lang.Blocks.location_jeollabuk, 'JEOLLABUK'],
                                        [Lang.Blocks.location_jeju, 'JEJU'],
                                        [Lang.Blocks.location_chungcheongnam, 'CHUNGCHEONGNAM'],
                                        [Lang.Blocks.location_chungcheongbuk, 'CHUNGCHEONGBUK'],
                                    ],
                                    value: 'SEOUL',
                                    fontSize: 11,
                                    arrowColor: EntryStatic.ARROW_COLOR_VARIABLE,
                                    converter:Entry.block.converters.returnStringValue,
                                    codeMap:'Entry.CodeMap.Entry.choose_city[0]',
                                },
                                {
                                    type: 'Dropdown',
                                    options: [
                                        [Lang.Blocks.EXPANSION_WEATHER_sunny, 'SUNNY'],
                                        [Lang.Blocks.EXPANSION_WEATHER_partly_cloudy, 'PARTLY_CLOUDY'],
                                        [Lang.Blocks.EXPANSION_WEATHER_mostly_cloudy, 'MOSTLY_CLOUDY'],
                                        [Lang.Blocks.EXPANSION_WEATHER_cloudy, 'CLOUDY'],
                                        [Lang.Blocks.EXPANSION_WEATHER_rainy, 'RAINY'],
                                        [Lang.Blocks.EXPANSION_WEATHER_sleet, 'SLEET'],
                                        [Lang.Blocks.EXPANSION_WEATHER_snowy, 'SNOWY'],
                                    ],
                                    value: 'SUNNY',
                                    fontSize: 11,
                                    arrowColor: EntryStatic.ARROW_COLOR_VARIABLE,
                                    converter:Entry.block.converters.returnStringValue,
                                    codeMap:'Entry.CodeMap.Entry.choose_weather[0]',
                                },
                            ],
                        },
                    ],
                },
            },
            check_finedust: {
                color: '#AEB8FF',
                skeleton: 'basic_boolean_field',
                statements: [],
                params: [
                    {
                        type: 'Dropdown',
                        options: [
                            [Lang.Blocks.date_yesterday, 'YESTERDAY'],
                            [Lang.Blocks.date_today, 'TODAY'],
                            [Lang.Blocks.date_tomorrow, 'TOMORROW'],
                            [Lang.Blocks.date_after_2_days, 'AFTER2DAYS'],
                            [Lang.Blocks.date_after_3_days, 'AFTER3DAYS'],
                            [Lang.Blocks.date_after_4_days, 'AFTER4DAYS'],
                            [Lang.Blocks.date_after_5_days, 'AFTER5DAYS'],
                            [Lang.Blocks.date_after_6_days, 'AFTER6DAYS'],
                        ],
                        value: 'TODAY',
                        fontSize: 11,
                        arrowColor: EntryStatic.ARROW_COLOR_VARIABLE,
                    },
                    {
                        type: 'Dropdown',
                        options: [
                            [Lang.Blocks.location_seoul, 'SEOUL'],
                            [Lang.Blocks.location_gangwon, 'GANGWON'],
                            [Lang.Blocks.location_gyeonggi, 'GYEONGGI'],
                            [Lang.Blocks.location_gyeongsangnam, 'GYEONGSANGNAM'],
                            [Lang.Blocks.location_gyeongsangbuk, 'GYEONGSANGBUK'],
                            [Lang.Blocks.location_gwangju, 'GWANGJU'],
                            [Lang.Blocks.location_daegu, 'DAEGU'],
                            [Lang.Blocks.location_daejeon, 'DAEJEON'],
                            [Lang.Blocks.location_busan, 'BUSAN'],
                            [Lang.Blocks.location_sejong, 'SEJONG'],
                            [Lang.Blocks.location_ulsan, 'ULSAN'],
                            [Lang.Blocks.location_incheon, 'INCHEON'],
                            [Lang.Blocks.location_jeollanam, 'JEOLLANAM'],
                            [Lang.Blocks.location_jeollabuk, 'JEOLLABUK'],
                            [Lang.Blocks.location_jeju, 'JEJU'],
                            [Lang.Blocks.location_chungcheongnam, 'CHUNGCHEONGNAM'],
                            [Lang.Blocks.location_chungcheongbuk, 'CHUNGCHEONGBUK'],
                        ],
                        value: 'SEOUL',
                        fontSize: 11,
                        arrowColor: EntryStatic.ARROW_COLOR_VARIABLE,
                    },
                    {
                        type: 'Dropdown',
                        options: [
                            [Lang.Blocks.EXPANSION_WEATHER_finedust_good, '1'],
                            [Lang.Blocks.EXPANSION_WEATHER_finedust_normal, '2'],
                            [Lang.Blocks.EXPANSION_WEATHER_finedust_bad, '3'],
                            [Lang.Blocks.EXPANSION_WEATHER_finedust_very_bad, '4'],
                        ],
                        value: 'GOOD',
                        fontSize: 11,
                        arrowColor: EntryStatic.ARROW_COLOR_VARIABLE,
                    },
                ],
                events: {},
                def: {
                    params: ['TODAY', 'SEOUL', '1'],
                    type: 'check_finedust',
                },
                pyHelpDef: {
                    params: ['A&value', 'A&value', 'A&value'],
                    type: 'check_finedust',
                },
                paramsKeyMap: {
                    DATE:0,
                    LOCATION:1,
                    FINEDUST:2
                },
                class: 'weather',
                isNotFor: ['weather'],
                func: function (sprite, script) {
                    var date = Entry.WeatherForecast.getDate(script.getField('DATE', script));
                    var location = Entry.WeatherForecast.getLocation(script.getField('LOCATION', script));
                    var finedust = script.getField('FINEDUST', script);

                    var apiResult = Entry.WeatherForecast.mockData(date, "0600", location.x, location.y);
                    return apiResult.data["pm10Grade"] == finedust;
                },
                syntax: {
                    js: [],
                    py: [
                        {
                            syntax: 'Entry.check_finedust(%1, %2, %3)',
                            blockType: 'param',
                            textParams: [
                                {
                                    type: 'Dropdown',
                                    options: [
                                        [Lang.Blocks.date_yesterday, 'YESTERDAY'],
                                        [Lang.Blocks.date_today, 'TODAY'],
                                        [Lang.Blocks.date_tomorrow, 'TOMORROW'],
                                        [Lang.Blocks.date_after_2_days, 'AFTER2DAYS'],
                                        [Lang.Blocks.date_after_3_days, 'AFTER3DAYS'],
                                        [Lang.Blocks.date_after_4_days, 'AFTER4DAYS'],
                                        [Lang.Blocks.date_after_5_days, 'AFTER5DAYS'],
                                        [Lang.Blocks.date_after_6_days, 'AFTER6DAYS'],
                                    ],
                                    value: 'TODAY',
                                    fontSize: 11,
                                    arrowColor: EntryStatic.ARROW_COLOR_VARIABLE,
                                    converter:Entry.block.converters.returnStringValue,
                                    codeMap:'Entry.CodeMap.Entry.get_date_for_weather[0]',
                                },
                                {
                                    type: 'Dropdown',
                                    options: [
                                        [Lang.Blocks.location_seoul, 'SEOUL'],
                                        [Lang.Blocks.location_gangwon, 'GANGWON'],
                                        [Lang.Blocks.location_gyeonggi, 'GYEONGGI'],
                                        [Lang.Blocks.location_gyeongsangnam, 'GYEONGSANGNAM'],
                                        [Lang.Blocks.location_gyeongsangbuk, 'GYEONGSANGBUK'],
                                        [Lang.Blocks.location_gwangju, 'GWANGJU'],
                                        [Lang.Blocks.location_daegu, 'DAEGU'],
                                        [Lang.Blocks.location_daejeon, 'DAEJEON'],
                                        [Lang.Blocks.location_busan, 'BUSAN'],
                                        [Lang.Blocks.location_sejong, 'SEJONG'],
                                        [Lang.Blocks.location_ulsan, 'ULSAN'],
                                        [Lang.Blocks.location_incheon, 'INCHEON'],
                                        [Lang.Blocks.location_jeollanam, 'JEOLLANAM'],
                                        [Lang.Blocks.location_jeollabuk, 'JEOLLABUK'],
                                        [Lang.Blocks.location_jeju, 'JEJU'],
                                        [Lang.Blocks.location_chungcheongnam, 'CHUNGCHEONGNAM'],
                                        [Lang.Blocks.location_chungcheongbuk, 'CHUNGCHEONGBUK'],
                                    ],
                                    value: 'SEOUL',
                                    fontSize: 11,
                                    arrowColor: EntryStatic.ARROW_COLOR_VARIABLE,
                                    converter:Entry.block.converters.returnStringValue,
                                    codeMap:'Entry.CodeMap.Entry.choose_city[0]',
                                },
                                {
                                    type: 'Dropdown',
                                    options: [
                                        [Lang.Blocks.EXPANSION_WEATHER_finedust_good, '1'],
                                        [Lang.Blocks.EXPANSION_WEATHER_finedust_normal, '2'],
                                        [Lang.Blocks.EXPANSION_WEATHER_finedust_bad, '3'],
                                        [Lang.Blocks.EXPANSION_WEATHER_finedust_very_bad, '4'],
                                    ],
                                    value: 'GOOD',
                                    fontSize: 11,
                                    arrowColor: EntryStatic.ARROW_COLOR_VARIABLE,
                                    converter:Entry.block.converters.returnStringValue,
                                    codeMap:'Entry.CodeMap.Entry.get_finedust_grade[0]',
                                },
                            ]
                        },
                    ],
                },
            },
            get_weather_data: {
                color: '#FFD974',
                skeleton: 'basic_string_field',
                statements: [],
                params: [
                    {
                        type: 'Dropdown',
                        options: [
                            [Lang.Blocks.date_yesterday, 'YESTERDAY'],
                            [Lang.Blocks.date_today, 'TODAY'],
                            [Lang.Blocks.date_tomorrow, 'TOMORROW'],
                            [Lang.Blocks.date_after_2_days, 'AFTER2DAYS'],
                            [Lang.Blocks.date_after_3_days, 'AFTER3DAYS'],
                            [Lang.Blocks.date_after_4_days, 'AFTER4DAYS'],
                            [Lang.Blocks.date_after_5_days, 'AFTER5DAYS'],
                            [Lang.Blocks.date_after_6_days, 'AFTER6DAYS'],
                        ],
                        value: 'TODAY',
                        fontSize: 11,
                        arrowColor: EntryStatic.ARROW_COLOR_VARIABLE,
                    },
                    {
                        type: 'Dropdown',
                        options: [
                            [Lang.Blocks.location_seoul, 'SEOUL'],
                            [Lang.Blocks.location_gangwon, 'GANGWON'],
                            [Lang.Blocks.location_gyeonggi, 'GYEONGGI'],
                            [Lang.Blocks.location_gyeongsangnam, 'GYEONGSANGNAM'],
                            [Lang.Blocks.location_gyeongsangbuk, 'GYEONGSANGBUK'],
                            [Lang.Blocks.location_gwangju, 'GWANGJU'],
                            [Lang.Blocks.location_daegu, 'DAEGU'],
                            [Lang.Blocks.location_daejeon, 'DAEJEON'],
                            [Lang.Blocks.location_busan, 'BUSAN'],
                            [Lang.Blocks.location_sejong, 'SEJONG'],
                            [Lang.Blocks.location_ulsan, 'ULSAN'],
                            [Lang.Blocks.location_incheon, 'INCHEON'],
                            [Lang.Blocks.location_jeollanam, 'JEOLLANAM'],
                            [Lang.Blocks.location_jeollabuk, 'JEOLLABUK'],
                            [Lang.Blocks.location_jeju, 'JEJU'],
                            [Lang.Blocks.location_chungcheongnam, 'CHUNGCHEONGNAM'],
                            [Lang.Blocks.location_chungcheongbuk, 'CHUNGCHEONGBUK'],
                        ],
                        value: 'SEOUL',
                        fontSize: 11,
                        arrowColor: EntryStatic.ARROW_COLOR_VARIABLE,
                    },
                    {
                        type: 'Dropdown',
                        options: [
                            [Lang.Blocks.EXPANSION_WEATHER_lowest_temperature, 'TMN'],
                            [Lang.Blocks.EXPANSION_WEATHER_highest_temperature, 'TMX'],
                            [Lang.Blocks.EXPANSION_WEATHER_humidity, 'REH'],
                            [Lang.Blocks.EXPANSION_WEATHER_precipitation, 'R06'],
                            [Lang.Blocks.EXPANSION_WEATHER_precipitation_probability, 'POP'],
                            [Lang.Blocks.EXPANSION_WEATHER_wind_speed, 'WSD'],
                        ],
                        value: 'LOWEST_TEMPERATURE',
                        fontSize: 11,
                        arrowColor: EntryStatic.ARROW_COLOR_VARIABLE,
                    },
                ],
                events: {},
                def: {
                    params: ['TODAY', 'SEOUL', 'TMN'],
                    type: 'get_weather_data',
                },
                pyHelpDef: {
                    params: ['A&value', 'A&value', 'A&value'],
                    type: 'get_weather_data',
                },
                paramsKeyMap: {
                    DATE:0,
                    LOCATION:1,
                    TYPE:2
                },
                class: 'weather',
                isNotFor: ['weather'],
                func: function (sprite, script) {
                    var date = Entry.WeatherForecast.getDate(script.getField('DATE', script));
                    var location = Entry.WeatherForecast.getLocation(script.getField('LOCATION', script));
                    var type = script.getField('TYPE', script);
                    var apiResult = Entry.WeatherForecast.mockData(date, "0600", location.x, location.y);

                    return apiResult.data[type];
                },
                syntax: {
                    js: [],
                    py: [
                        {
                            syntax: 'Entry.get_weather_data(%1, %2, %3)',
                            blockType: 'param',
                            textParams: [
                                {
                                    type: 'Dropdown',
                                    options: [
                                        [Lang.Blocks.date_yesterday, 'YESTERDAY'],
                                        [Lang.Blocks.date_today, 'TODAY'],
                                        [Lang.Blocks.date_tomorrow, 'TOMORROW'],
                                        [Lang.Blocks.date_after_2_days, 'AFTER2DAYS'],
                                        [Lang.Blocks.date_after_3_days, 'AFTER3DAYS'],
                                        [Lang.Blocks.date_after_4_days, 'AFTER4DAYS'],
                                        [Lang.Blocks.date_after_5_days, 'AFTER5DAYS'],
                                        [Lang.Blocks.date_after_6_days, 'AFTER6DAYS'],
                                    ],
                                    value: 'TODAY',
                                    fontSize: 11,
                                    arrowColor: EntryStatic.ARROW_COLOR_VARIABLE,
                                    converter:Entry.block.converters.returnStringValue,
                                    codeMap:'Entry.CodeMap.Entry.get_date_for_weather[0]',
                                },
                                {
                                    type: 'Dropdown',
                                    options: [
                                        [Lang.Blocks.location_seoul, 'SEOUL'],
                                        [Lang.Blocks.location_gangwon, 'GANGWON'],
                                        [Lang.Blocks.location_gyeonggi, 'GYEONGGI'],
                                        [Lang.Blocks.location_gyeongsangnam, 'GYEONGSANGNAM'],
                                        [Lang.Blocks.location_gyeongsangbuk, 'GYEONGSANGBUK'],
                                        [Lang.Blocks.location_gwangju, 'GWANGJU'],
                                        [Lang.Blocks.location_daegu, 'DAEGU'],
                                        [Lang.Blocks.location_daejeon, 'DAEJEON'],
                                        [Lang.Blocks.location_busan, 'BUSAN'],
                                        [Lang.Blocks.location_sejong, 'SEJONG'],
                                        [Lang.Blocks.location_ulsan, 'ULSAN'],
                                        [Lang.Blocks.location_incheon, 'INCHEON'],
                                        [Lang.Blocks.location_jeollanam, 'JEOLLANAM'],
                                        [Lang.Blocks.location_jeollabuk, 'JEOLLABUK'],
                                        [Lang.Blocks.location_jeju, 'JEJU'],
                                        [Lang.Blocks.location_chungcheongnam, 'CHUNGCHEONGNAM'],
                                        [Lang.Blocks.location_chungcheongbuk, 'CHUNGCHEONGBUK'],
                                    ],
                                    value: 'SEOUL',
                                    fontSize: 11,
                                    arrowColor: EntryStatic.ARROW_COLOR_VARIABLE,
                                    converter:Entry.block.converters.returnStringValue,
                                    codeMap:'Entry.CodeMap.Entry.choose_city[0]',
                                },
                                {
                                    type: 'Dropdown',
                                    options: [
                                        [Lang.Blocks.EXPANSION_WEATHER_lowest_temperature, 'TMN'],
                                        [Lang.Blocks.EXPANSION_WEATHER_highest_temperature, 'TMX'],
                                        [Lang.Blocks.EXPANSION_WEATHER_humidity, 'REH'],
                                        [Lang.Blocks.EXPANSION_WEATHER_precipitation, 'R06'],
                                        [Lang.Blocks.EXPANSION_WEATHER_precipitation_probability, 'POP'],
                                        [Lang.Blocks.EXPANSION_WEATHER_wind_speed, 'WSD'],
                                    ],
                                    value: 'LOWEST_TEMPERATURE',
                                    fontSize: 11,
                                    arrowColor: EntryStatic.ARROW_COLOR_VARIABLE,
                                    converter:Entry.block.converters.returnStringValue,
                                    codeMap:'Entry.CodeMap.Entry.get_weather_type[0]',
                                },
                            ]
                        },
                    ],
                },
            },
            get_weather_data_now: {
                color: '#FFD974',
                skeleton: 'basic_string_field',
                statements: [],
                params: [
                    {
                        type: 'Dropdown',
                        options: [
                            [Lang.Blocks.location_seoul, 'SEOUL'],
                            [Lang.Blocks.location_gangwon, 'GANGWON'],
                            [Lang.Blocks.location_gyeonggi, 'GYEONGGI'],
                            [Lang.Blocks.location_gyeongsangnam, 'GYEONGSANGNAM'],
                            [Lang.Blocks.location_gyeongsangbuk, 'GYEONGSANGBUK'],
                            [Lang.Blocks.location_gwangju, 'GWANGJU'],
                            [Lang.Blocks.location_daegu, 'DAEGU'],
                            [Lang.Blocks.location_daejeon, 'DAEJEON'],
                            [Lang.Blocks.location_busan, 'BUSAN'],
                            [Lang.Blocks.location_sejong, 'SEJONG'],
                            [Lang.Blocks.location_ulsan, 'ULSAN'],
                            [Lang.Blocks.location_incheon, 'INCHEON'],
                            [Lang.Blocks.location_jeollanam, 'JEOLLANAM'],
                            [Lang.Blocks.location_jeollabuk, 'JEOLLABUK'],
                            [Lang.Blocks.location_jeju, 'JEJU'],
                            [Lang.Blocks.location_chungcheongnam, 'CHUNGCHEONGNAM'],
                            [Lang.Blocks.location_chungcheongbuk, 'CHUNGCHEONGBUK'],
                        ],
                        value: 'SEOUL',
                        fontSize: 11,
                        arrowColor: EntryStatic.ARROW_COLOR_VARIABLE,
                    },
                    {
                        type: 'Dropdown',
                        options: [
                            [Lang.Blocks.EXPANSION_WEATHER_temperature, 'TEMPERATURE'],
                            [Lang.Blocks.EXPANSION_WEATHER_finedust, 'FINEDUST'],
                        ],
                        value: 'TEMPERATURE',
                        fontSize: 11,
                        arrowColor: EntryStatic.ARROW_COLOR_VARIABLE,
                    },
                ],
                events: {},
                def: {
                    params: ['SEOUL', 'TEMPERATURE'],
                    type: 'get_weather_data_now',
                },
                pyHelpDef: {
                    params: ['A&value', 'A&value'],
                    type: 'get_weather_data_now',
                },
                paramsKeyMap: {
                    LOCATION:0,
                    TYPE:1
                },
                class: 'weather',
                isNotFor: ['weather'],
                func: function (sprite, script) {
                    var location = Entry.WeatherForecast.getLocation(script.getField('LOCATION', script));
                    var type = script.getField('TYPE', script);
                    var date = new Date().toISOString().slice(0,10).replace(/-/g,"");
                    var apiResult = Entry.WeatherForecast.mockData(date, "0600", location.x, location.y);

                    if(type == "TEMPERATURE") {
                        return apiResult.data["T3H"];
                    }else {
                        return apiResult.data["pm10Value"];
                    }
                },
                syntax: {
                    js: [],
                    py: [
                        {
                            syntax: 'Entry.get_weather_data_now(%1, %2)',
                            blockType: 'param',
                            textParams: [
                                {
                                    type: 'Dropdown',
                                    options: [
                                        [Lang.Blocks.location_seoul, 'SEOUL'],
                                        [Lang.Blocks.location_gangwon, 'GANGWON'],
                                        [Lang.Blocks.location_gyeonggi, 'GYEONGGI'],
                                        [Lang.Blocks.location_gyeongsangnam, 'GYEONGSANGNAM'],
                                        [Lang.Blocks.location_gyeongsangbuk, 'GYEONGSANGBUK'],
                                        [Lang.Blocks.location_gwangju, 'GWANGJU'],
                                        [Lang.Blocks.location_daegu, 'DAEGU'],
                                        [Lang.Blocks.location_daejeon, 'DAEJEON'],
                                        [Lang.Blocks.location_busan, 'BUSAN'],
                                        [Lang.Blocks.location_sejong, 'SEJONG'],
                                        [Lang.Blocks.location_ulsan, 'ULSAN'],
                                        [Lang.Blocks.location_incheon, 'INCHEON'],
                                        [Lang.Blocks.location_jeollanam, 'JEOLLANAM'],
                                        [Lang.Blocks.location_jeollabuk, 'JEOLLABUK'],
                                        [Lang.Blocks.location_jeju, 'JEJU'],
                                        [Lang.Blocks.location_chungcheongnam, 'CHUNGCHEONGNAM'],
                                        [Lang.Blocks.location_chungcheongbuk, 'CHUNGCHEONGBUK'],
                                    ],
                                    value: 'SEOUL',
                                    fontSize: 11,
                                    arrowColor: EntryStatic.ARROW_COLOR_VARIABLE,
                                    converter:Entry.block.converters.returnStringValue,
                                    codeMap:'Entry.CodeMap.Entry.choose_city[0]',
                                },
                                {
                                    type: 'Dropdown',
                                    options: [
                                        [Lang.Blocks.EXPANSION_WEATHER_temperature, 'TEMPERATURE'],
                                        [Lang.Blocks.EXPANSION_WEATHER_finedust, 'FINEDUST'],
                                    ],
                                    value: 'TEMPERATURE',
                                    fontSize: 11,
                                    arrowColor: EntryStatic.ARROW_COLOR_VARIABLE,
                                    converter:Entry.block.converters.returnStringValue,
                                    codeMap:'Entry.CodeMap.Entry.weather_api_type[0]',
                                },
                            ]
                        },
                    ],
                },
            },
            get_temperatures_at: {
                color: '#FFD974',
                skeleton: 'basic_string_field',
                statements: [],
                params: [
                    {
                        type: 'Dropdown',
                        options: [
                            [Lang.Blocks.location_seoul, 'SEOUL'],
                            [Lang.Blocks.location_gangwon, 'GANGWON'],
                            [Lang.Blocks.location_gyeonggi, 'GYEONGGI'],
                            [Lang.Blocks.location_gyeongsangnam, 'GYEONGSANGNAM'],
                            [Lang.Blocks.location_gyeongsangbuk, 'GYEONGSANGBUK'],
                            [Lang.Blocks.location_gwangju, 'GWANGJU'],
                            [Lang.Blocks.location_daegu, 'DAEGU'],
                            [Lang.Blocks.location_daejeon, 'DAEJEON'],
                            [Lang.Blocks.location_busan, 'BUSAN'],
                            [Lang.Blocks.location_sejong, 'SEJONG'],
                            [Lang.Blocks.location_ulsan, 'ULSAN'],
                            [Lang.Blocks.location_incheon, 'INCHEON'],
                            [Lang.Blocks.location_jeollanam, 'JEOLLANAM'],
                            [Lang.Blocks.location_jeollabuk, 'JEOLLABUK'],
                            [Lang.Blocks.location_jeju, 'JEJU'],
                            [Lang.Blocks.location_chungcheongnam, 'CHUNGCHEONGNAM'],
                            [Lang.Blocks.location_chungcheongbuk, 'CHUNGCHEONGBUK'],
                        ],
                        value: 'SEOUL',
                        fontSize: 11,
                        arrowColor: EntryStatic.ARROW_COLOR_VARIABLE,
                    },
                    {
                        type: 'Dropdown',
                        options: [
                            ["00", '00'],
                            ["03", '03'],
                            ["06", '06'],
                            ["09", '09'],
                            ["12", '12'],
                            ["15", '15'],
                            ["18", '18'],
                            ["21", '21'],
                        ],
                        value: '00',
                        fontSize: 11,
                        arrowColor: EntryStatic.ARROW_COLOR_VARIABLE,
                    },
                ],
                events: {},
                def: {
                    params: ['SEOUL','00'],
                    type: 'get_temperatures_at',
                },
                pyHelpDef: {
                    params: ['A&value','A&value'],
                    type: 'get_temperatures_at',
                },
                paramsKeyMap: {
                    LOCATION:0,
                    TIME:1
                },
                class: 'weather',
                isNotFor: ['weather'],
                func: function (sprite, script) {
                    var location = Entry.WeatherForecast.getLocation(script.getField('LOCATION', script));
                    var time = script.getField('TIME', script) + "00";
                    var date = new Date().toISOString().slice(0,10).replace(/-/g,"");
                    var apiResult = Entry.WeatherForecast.mockData(date, time, location.x, location.y);
                    return apiResult.data["T3H"];
                },
                syntax: {
                    js: [],
                    py: [
                        {
                            syntax: 'Entry.get_temperatures_at(%1, %2)',
                            blockType: 'param',
                            textParams: [
                                {
                                    type: 'Dropdown',
                                    options: [
                                        [Lang.Blocks.location_seoul, 'SEOUL'],
                                        [Lang.Blocks.location_gangwon, 'GANGWON'],
                                        [Lang.Blocks.location_gyeonggi, 'GYEONGGI'],
                                        [Lang.Blocks.location_gyeongsangnam, 'GYEONGSANGNAM'],
                                        [Lang.Blocks.location_gyeongsangbuk, 'GYEONGSANGBUK'],
                                        [Lang.Blocks.location_gwangju, 'GWANGJU'],
                                        [Lang.Blocks.location_daegu, 'DAEGU'],
                                        [Lang.Blocks.location_daejeon, 'DAEJEON'],
                                        [Lang.Blocks.location_busan, 'BUSAN'],
                                        [Lang.Blocks.location_sejong, 'SEJONG'],
                                        [Lang.Blocks.location_ulsan, 'ULSAN'],
                                        [Lang.Blocks.location_incheon, 'INCHEON'],
                                        [Lang.Blocks.location_jeollanam, 'JEOLLANAM'],
                                        [Lang.Blocks.location_jeollabuk, 'JEOLLABUK'],
                                        [Lang.Blocks.location_jeju, 'JEJU'],
                                        [Lang.Blocks.location_chungcheongnam, 'CHUNGCHEONGNAM'],
                                        [Lang.Blocks.location_chungcheongbuk, 'CHUNGCHEONGBUK'],
                                    ],
                                    value: 'SEOUL',
                                    fontSize: 11,
                                    arrowColor: EntryStatic.ARROW_COLOR_VARIABLE,
                                    converter:Entry.block.converters.returnStringValue,
                                    codeMap:'Entry.CodeMap.Entry.choose_city[0]',
                                },
                                {
                                    type: 'Dropdown',
                                    options: [
                                        ["00", '00'],
                                        ["03", '03'],
                                        ["06", '06'],
                                        ["09", '09'],
                                        ["12", '12'],
                                        ["15", '15'],
                                        ["18", '18'],
                                        ["21", '21'],
                                    ],
                                    value: '00',
                                    fontSize: 11,
                                    arrowColor: EntryStatic.ARROW_COLOR_VARIABLE,
                                    converter:Entry.block.converters.returnStringValue,
                                    codeMap:'Entry.CodeMap.Entry.get_time_for_weahter[0]',
                                }
                            ]
                        },
                    ],
                },
            },
        }
}
