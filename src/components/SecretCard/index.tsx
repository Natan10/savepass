import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import 
  Animated, 
  {
    Layout,
    runOnJS,
    SlideInRight,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
  } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { 
  Placeholder,
  PlaceholderMedia,
  Fade
} from "rn-placeholder";



import { 
  Container,
  ShowSecret,
  SecretContent,
  SecretName,
  Email,
  Secret
} from './styles';
import { Dimensions, View } from 'react-native';

export interface SecretCardData {
  id: string;
  user: string;
  service: string;
  password: string;
}

export interface ViewSecretCardData extends SecretCardData {
  load?: boolean;
}

interface Props {
  data: ViewSecretCardData
  index: number;
  onDelete?: (id: string) => void;
}

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.2;

const SECRET_CARD_HEIGHT = 90;

export const SecretCard = ({data, index, onDelete}: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  const theme = useTheme();

  // animations properties
  const translateX = useSharedValue(0);
  const secretCardHeight = useSharedValue(SECRET_CARD_HEIGHT);
  const marginBottomCard = useSharedValue(18);
  const opacityCard = useSharedValue(1);

  const panGesture = useAnimatedGestureHandler({
    onActive: (event) => {
      if(event.translationX < 0){
        translateX.value = event.translationX;
      }
    },
    onEnd: () => {
      const shouldBeDIsmissed = translateX.value < TRANSLATE_X_THRESHOLD;
      if(shouldBeDIsmissed){
        translateX.value = withTiming(-SCREEN_WIDTH);
        secretCardHeight.value = withTiming(0);
        marginBottomCard.value = withTiming(0);
        opacityCard.value = withSpring(0,undefined, (finished) => {
          if(finished && onDelete) {
            runOnJS(onDelete)(data.id);
          }
        });
      }else{
        translateX.value = withTiming(0);
      }
    }
  });

  const secretCardCustomStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value
        }
      ]
    }
  });

  const iconCustomStyle = useAnimatedStyle(() => {
    const opacity = withTiming(translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0);
    return {
      opacity,
    };
  });

  const containerSecretCardCustomStyle = useAnimatedStyle(() => {
    return {
      height: secretCardHeight.value,
      marginBottom: marginBottomCard.value,
      opacity: opacityCard.value
    };
  })


  return data.load ? (
    <Placeholder 
      Animation={Fade}
      style={{
        opacity: 0.2,
      }}
    >
      <PlaceholderMedia 
        color={theme.colors.black}
        style={{
          flex: 1,
          width: '100%',
          height: 90,
          borderRadius: 5,
          marginBottom: 18,
        }}
      />
    </Placeholder>
  ):(
    <Animated.View
      style={[{
        justifyContent: 'center'
      },containerSecretCardCustomStyle]}
    >
       <Animated.View 
        style={[{
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          right: '5%',
        }, iconCustomStyle]}
      >
        <FontAwesome name="trash-o" size={30} color={theme.colors.attention} />
      </Animated.View>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View
          style={secretCardCustomStyle}
          entering={SlideInRight.delay(index*100)}
          layout={Layout.springify()}
        >
          <Container
            end={{x:1,y:0}}     
            colors={[ isVisible ? '#EBF2FF' : '#ffffff', '#ffffff']}
          >
            <ShowSecret onPress={() => setIsVisible(old => !old)}>
              <FontAwesome
                name={`${ isVisible ? 'eye-slash' : 'eye'}`} 
                color={isVisible ? theme.colors.primary : theme.colors.text_light} 
                size={20} 
              /> 
            </ShowSecret>

            <SecretContent>
              <SecretName visible={isVisible}>{data.service}</SecretName>
              {!isVisible ? 
                <Email>{data.user}</Email> :
                <Secret>{data.password}</Secret>
              }
            </SecretContent>
          </Container>
        </Animated.View>
      </PanGestureHandler> 
    </Animated.View>
  );
}

