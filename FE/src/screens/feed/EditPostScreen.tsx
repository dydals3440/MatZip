import PostForm from '@/components/post/PostForm';
import {feedNavigations, mapNavigations} from '@/constants';
import {FeedStackParamlist} from '@/navigations/stack/FeedStackNavigator';

import {StackScreenProps} from '@react-navigation/stack';

type EditPostScreenProps = StackScreenProps<
  FeedStackParamlist,
  typeof feedNavigations.EDIT_POST
>;

function EditPostScreen({route}: EditPostScreenProps) {
  const {location} = route.params;

  return <PostForm location={location} isEdit />;
}

export default EditPostScreen;
