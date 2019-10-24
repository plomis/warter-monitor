
import React from 'react';
import is from 'whatitis';
import { View, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SvgUri from '../../../../components/SvgUri';
import water from '../../../../assets/svg/water.svg';
import Grid from './bannerGrid';


function Banner({ bannerHeight, data }) {

  return (
    <View style={styles.banner}>
      <LinearGradient
        colors={[ '#667eff', '#6697ff', '#6667ff' ]}
        style={[ styles.bannerBackground, { height: bannerHeight }]}>
        <View style={styles.bannerNumber}>
          <View style={styles.water}>
            <SvgUri
              width="40"
              height="40"
              svgXmlData={water}
              style={styles.waterBigImage} />
            <SvgUri
              width="80"
              height="80"
              svgXmlData={water}
              style={styles.waterImage} />
          </View>
          <View style={styles.bannerNumberText}>
            <View style={styles.bannerNumberTextMain}>
              <Text style={styles.bannerNumberTextMainNum}>
                {is.Defined( data.todayDosage ) ? data.todayDosage : '--'}
              </Text>
              <Text style={styles.bannerNumberTextMainUnit}>
                吨
              </Text>
            </View>
            <Text style={styles.bannerNumberTextSub}>
              今日实时用水
            </Text>
          </View>
        </View>
        <View style={styles.bannerInfo}>
          <View style={styles.bannerInfoItem}>
            <View style={styles.bannerInfoItemMain}>
              <Text style={styles.bannerInfoItemMainNum}>
                {is.Defined( data.lastMonthDosage ) ? data.lastMonthDosage : '--'}
              </Text>
              <Text style={styles.bannerInfoItemMainUnit}>
                吨
              </Text>
            </View>
            <Text style={styles.bannerInfoItemSub}>
              上月总用水
            </Text>
          </View>
          <View style={styles.bannerInfoItem}>
            <View style={styles.bannerInfoItemMain}>
              <Text style={styles.bannerInfoItemMainNum}>
                {is.Defined( data.yesterdayDosage ) ? data.yesterdayDosage : '--'}
              </Text>
              <Text style={styles.bannerInfoItemMainUnit}>
                吨
              </Text>
            </View>
            <Text style={styles.bannerInfoItemSub}>
              昨日总用水
            </Text>
          </View>
        </View>
        <View style={styles.bannerGrid}>
          <Grid data={data} />
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flex: 0,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    backgroundColor: '#fff'
  },
  bannerBackground: {
    flex: 1
  },
  water: {
    flex: 0,
    opacity: 0.15,
    position: 'absolute',
    height: 80,
    width: 80,
    transform: [{
      translateX: -98
    }]
  },
  waterBigImage: {
    flex: 0,
    position: 'absolute',
    opacity: 0.5,
    left: 40,
    top: 0
  },
  waterImage: {
    flex: 0,
    position: 'absolute',
    left: 0,
    top: 0
  },
  bannerNumber: {
    flex: 1,
    marginTop: 44 + 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bannerNumberTextMain: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bannerNumberTextMainNum: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'rgba(255,255,255,0.9)'
  },
  bannerNumberTextMainUnit: {
    fontSize: 14,
    marginTop: 8,
    transform: [{
      translateX: 8
    }],
    color: 'rgba(255,255,255,0.8)'
  },
  bannerNumberTextSub: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
    color: 'rgba(255,255,255,0.7)'
  },
  bannerInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bannerInfoItem: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bannerInfoItemMain: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bannerInfoItemMainNum: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 6,
    color: 'rgba(255,255,255,0.9)'
  },
  bannerInfoItemMainUnit: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)'
  },
  bannerInfoItemSub: {
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
    color: 'rgba(255,255,255,0.7)'
  },
  bannerGrid: {
    flex: 0,
    height: 180,
    padding: 16,
    paddingTop: 0
  }
});

export default Banner;
