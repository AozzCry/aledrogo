import {Box, Stack,HStack} from '@chakra-ui/react';
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
const ProductSkeleton = () => {
  return (
     <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" padding={'6'}>
    
    <Stack>
      <Skeleton height={'100px'} w={'100px'}> </Skeleton>
      <SkeletonText  width={'20'} mt='4' noOfLines={3} spacing='4'> </SkeletonText>
      <HStack>
      <Skeleton height={'40px'} w={'114px'}> </Skeleton>
      <Skeleton height={'40px'} w={'114px'}> </Skeleton>
      <Skeleton height={'40px'} w={'114px'}> </Skeleton>
      </HStack>
      </Stack>
  </Box>
   );
}
 
export default ProductSkeleton;