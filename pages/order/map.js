export function b2cMapper(n) {
  var r = new Date(),
    t;
  if (!n)
    throw 'РќРµ СѓРєР°Р·Р°РЅ РѕР±СЏР·Р°С‚РµР»СЊРЅС‹Р№ РїР°СЂР°РјРµС‚СЂ params';
  if (!n.containerId)
    throw 'РќРµ СѓРєР°Р·Р°РЅ РѕР±СЏР·Р°С‚РµР»СЊРЅС‹Р№ РїР°СЂР°РјРµС‚СЂ params.containerId';
  if (
    ((b2cPvzId = undefined),
    n.pvzId && n.pvzId != '' && (b2cPvzId = n.pvzId.toLowerCase()),
    (b2cCallBack = undefined),
    n.callBack && typeof n.callBack == 'function' && (b2cCallBack = n.callBack),
    (b2cPvzElemId = undefined),
    n.elemId && n.elemId != '' && (b2cPvzElemId = n.elemId),
    b2cMap)
  )
    b2cMap.destroy(), $('#b2c-select').hide();
  else {
    let t =
        n.headerText == undefined
          ? 'Р’С‹Р±РµСЂРёС‚Рµ РЅР° РєР°СЂС‚Рµ РїСѓРЅРєС‚ РІС‹РґР°С‡Рё Р·Р°РєР°Р·РѕРІ'
          : n.headerText,
      i = n.containerHeight ? n.containerHeight : '500px';
    $('#' + n.containerId).html(
      (t != '' ? '<div style="font-weight:bold;">' + t + '</div>' : '') +
        '<div class="b2c-map-container" style="width:100%;height:' +
        i +
        '"><div class="b2c-map"><div id="b2c-map" style="width:100%; height:' +
        i +
        '"></div><div id="b2c-loading" class="b2c-block-loading">Р—Р°РіСЂСѓР·РєР°...</div><div id="b2c-select" class="b2c-select"><input id="b2c-select-pvz_id" type="hidden"/><p><strong>Р’С‹Р±СЂР°РЅ РїСѓРЅРєС‚ РґРѕСЃС‚Р°РІРєРё:</strong> <span id="b2c-select-addr"></span></p><p id="b2c-select-pvz_time" class="b2c-time"><strong>Р’СЂРµРјСЏ СЂР°Р±РѕС‚С‹:</strong> <span></span></p><p id="b2c-select-addrcomment" class="b2c-who"><strong>РљР°Рє РґРѕР±СЂР°С‚СЊСЃСЏ:</strong> <span></span></p></div><div id="b2c-list"><ul><li>Р—Р°РіСЂСѓР·РєР°...</li></ul></div></div></div><div style="padding-top:10px" title="РЎРµСЂРІРёСЃ РїСЂРµРґРѕСЃС‚Р°РІР»РµРЅ РєРѕРјРїР°РЅРёРµР№ B2CPL"><a href="https://b2cpl.ru" target="_blank"><img src="https://b2cpl.ru/themes/adaptive/images/template/logo.png" style="height:15px"/></a><span style="float:right">В© ' +
        r.getFullYear().toString() +
        '. Р’2РЎPL вЂ” Р’СЃРµ РїpР°РІР° Р·Р°С‰РёС‰РµРЅС‹</div>'
    );
  }
  $('#b2c-loading').show();
  let i = ['zoomControl', 'fullscreenControl', 'rulerControl'];
  if (
    (n.searchControl && n.searchControl === !0 && i.push('searchControl'),
    n.geolocation && n.geolocation === !0 && i.push('geolocationControl'),
    (b2cMap = new ymaps.Map('b2c-map', {
      center: [60.415, 91.2637],
      zoom: 3,
      controls: i,
      behaviors: ['default', 'scrollZoom']
    })),
    b2cList == 1
      ? ((t = new ymaps.control.Button({
          data: { content: 'РЎРєСЂС‹С‚СЊ СЃРїРёСЃРѕРє' },
          options: { float: 'right', maxWidth: '250' }
        })),
        $('#b2c-list').show())
      : ((t = new ymaps.control.Button({
          data: { content: 'РџРѕРєР°Р·Р°С‚СЊ СЃРїРёСЃРѕРє' },
          options: { float: 'right', maxWidth: '250' }
        })),
        $('#b2c-list').hide()),
    t.events.add('press', function () {
      $('#b2c-list').is(':visible')
        ? ($('#b2c-list').hide(),
          (b2cList = 0),
          t.data.set({ content: 'РџРѕРєР°Р·Р°С‚СЊ СЃРїРёСЃРѕРє' }))
        : (t.data.set({ content: 'РЎРєСЂС‹С‚СЊ СЃРїРёСЃРѕРє' }),
          $('#b2c-list').show(),
          (b2cList = 1),
          b2cListReady());
    }),
    b2cMap.controls.add(t),
    b2cPlacemarks)
  ) {
    let n = new ymaps.Clusterer({
      groupByCoordinates: !1,
      minClusterSize: 3,
      clusterIconLayout: 'default#pieChart'
    });
    n.add(b2cPlacemarks);
    b2cMap.geoObjects.add(n);
    b2cMap.events.add(
      ['boundschange', 'datachange', 'objecttypeschange'],
      function () {
        b2cListReady();
      }
    );
    b2cMap.geoObjects.events.add('balloonopen', function (n) {
      if (n.get('target')) {
        b2cPvzElemId &&
          ($('#' + b2cPvzElemId).get(0).tagName == 'input'
            ? $('#' + b2cPvzElemId).val(
                n.get('target').properties.get('objSid')
              )
            : $('#' + b2cPvzElemId).text(
                n.get('target').properties.get('objSid')
              ));
        $('#b2c-select-addr').html(n.get('target').properties.get('a'));
        $('#b2c-select-pvz_time span').html(
          n.get('target').properties.get('t')
        );
        let t = n.get('target').properties.get('ac');
        t
          ? ($('#b2c-select-addrcomment span').html(t),
            $('#b2c-select-addrcomment').show())
          : $('#b2c-select-addrcomment').hide();
        $('#b2c-select').show();
      }
    });
    b2cMap.geoObjects.events.add('balloonclose', function () {
      b2cPvzElemId &&
        ($('#' + b2cPvzElemId).get(0).tagName == 'input'
          ? $('#' + b2cPvzElemId).val('')
          : $('#' + b2cPvzElemId).text(''));
      $('#b2c-select').hide();
    });
  }
  b2cPvzId
    ? b2cPlacemarkOpen(b2cPvzId)
    : n.geolocation &&
      n.geolocation === !0 &&
      ymaps.geolocation
        .get({
          provider: 'yandex',
          autoReverseGeocode: !0
        })
        .then(function (n) {
          let t = n.geoObjects.get(0).geometry.getCoordinates();
          b2cMap.setCenter(t, 13);
        });
  setTimeout(function () {
    $('#b2c-loading').hide();
  }, 500);
}

function b2cListReady() {
  if (($('#b2c-list ul').empty(), $('#b2c-list').is(':visible'))) {
    let t = ymaps.geoQuery(b2cPlacemarks).searchInside(b2cMap),
      n = 0;
    t.each(function (t) {
      if (
        ($('#b2c-list ul').append(
          '<li><p><strong>' +
            t.properties.get('tp') +
            ' ' +
            t.properties.get('txt') +
            '</strong>: ' +
            t.properties.get('objSid') +
            '</p><strong>РђРґСЂРµСЃ: <strong>' +
            t.properties.get('a') +
            '</strong><br>РўРµР»РµС„РѕРЅ:</strong> ' +
            t.properties.get('p') +
            '<br><strong>Р’СЂРµРјСЏ СЂР°Р±РѕС‚С‹:</strong> ' +
            t.properties.get('t') +
            '<br><a href="#" class="b2cshowis" data-id="' +
            t.properties.get('objSid') +
            '">РџРѕРєР°Р·Р°С‚СЊ</a></li>'
        ),
        n == 50)
      )
        return !1;
      n++;
    });
    $('.b2cshowis').on('click', function (n) {
      n.preventDefault();
      b2cPlacemarkOpen($(this).data('id'));
    });
  }
}

function b2cPlacemarkOpen(n) {
  if (n != '') {
    let t = ymaps
      .geoQuery(b2cPlacemarks)
      .search('properties.objSid = "' + n + '"');
    if (t && typeof t.get(0) != 'undefined') {
      let n = t.get(0),
        i = n.geometry.getCoordinates();
      b2cMap.setCenter(i, 17).then(function () {
        n.balloon.open();
      });
    }
  }
}

var b2cMap,
  b2cReady,
  b2cPvzId,
  b2cPvzElemId,
  b2cList,
  b2cCallBack,
  b2cPlacemarks = [],
  errors = {
    send: 'РћС€РёР±РєР° РїРѕР»СѓС‡РµРЅРёСЏ РґР°РЅРЅС‹С…',
    success: 'РћС€РёР±РєР° РѕР±СЂР°Р±РѕС‚РєРё Р±Р°Р·С‹ РґР°РЅРЅС‹С…'
  };
$(document).ready(function () {
  b2cList = 0;
  var n = new Date(),
    t =
      n.getFullYear().toString() +
      (n.getMonth() < 9 ? '0' : '') +
      (n.getMonth() + 1).toString() +
      n.getDate().toString(),
    i = $("[src*='b2c-map-pvz.min.js']").data('pvzArray'),
    r = 'https://api.b2cpl.ru/files/json_pvz/' + i + '?v=' + t;
  ymaps.ready(function () {
    b2cReady = 1;
    $.ajax({
      type: 'GET',
      url: r,
      dataType: 'json',
      success: function (n) {
        var t, i;
        n != '' &&
          ((t = ymaps.templateLayoutFactory.createClass(
            '<strong>{{ properties.a }}</strong></br><strong>РўРёРї:</strong> {{ properties.tp }}</br><strong>РўРµР»РµС„РѕРЅ:</strong> {{ properties.p }}</br><strong>Р’СЂРµРјСЏ СЂР°Р±РѕС‚С‹:</strong> {{ properties.t }}</br><strong>РњР°РєСЃРёРјР°Р»СЊРЅС‹Р№ РІРµСЃ:</strong> {{ properties.w }}</br><strong>{{ properties.tp }} {{ properties.txt }}</strong></br><a href="javascript:void(0);" class="b2c-select-btn">Р’С‹Р±СЂР°С‚СЊ</a>',
            {
              build: function () {
                let n = this;
                if ((t.superclass.build.call(this), b2cCallBack)) {
                  $('.b2c-select-btn').on('click', function () {
                    let t = {};
                    t.id = n._data.geoObject.properties.get('objSid');
                    t.weightMax = n._data.geoObject.properties.get('w');
                    b2cCallBack(JSON.stringify(t));
                    b2cMap.balloon.close();
                  });
                  $('.b2c-select-btn').show();
                } else $('.b2c-select-btn').hide();
              },
              clear: function () {
                t.superclass.clear.call(this);
              }
            }
          )),
          ymaps.layout.storage.isDefined('balloonContentLayoutClass') ||
            ymaps.layout.storage.add('balloonContentLayoutClass', t),
          (i = 0),
          $.each(n, function () {
            b2cPlacemarks[i] = new ymaps.Placemark(
              [this.lat, this.lon],
              {
                objId: i,
                objSid: this.id,
                hintContent: this.a,
                a: this.a,
                ac: this.ac,
                p: this.p,
                t: this.t,
                w: this.w,
                txt: this.txt,
                tp: this.tp
              },
              {
                iconColor: this.ic,
                iconLayout: 'default#image',
                iconImageHref: this.l,
                iconImageSize: [27, 37],
                balloonContentLayout: 'balloonContentLayoutClass'
              }
            );
            i++;
          }));
      }
    });
  });
});
