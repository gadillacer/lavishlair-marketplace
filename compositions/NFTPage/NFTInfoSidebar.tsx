import { Heading, Stack, Flex, Paragraph, Box, BoxProps } from '@zoralabs/zord'
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { useNFTProvider, useTitleWithFallback } from '@shared'
import { Link } from 'components'
import { clickAnimation } from 'styles/styles.css'
import { nftInfoSidebar, nftInfoSidebarWrapper } from './NFTPage.css'
import { MarketUi } from './MarketUi'

import { lightFont } from '@shared'

export interface NFTInfoSidebar extends BoxProps {}

export function NFTInfoSidebar({ ...props }: NFTInfoSidebar) {
  const { initialData: nft, tokenId, contractAddress } = useNFTProvider()

  if (!nft || !tokenId || !contractAddress) return null

  const { fallbackTitle } = useTitleWithFallback(
    contractAddress,
    tokenId,
    nft?.tokenID
  )

  return (
    <Box id="nft-info-sidebar" className={nftInfoSidebar} {...props}>
      <Stack className={nftInfoSidebarWrapper}>
        <Flex>
          <Link href={`/collections/${nft?.contract.id}`}>
            <CollectionThumbnail
              collectionAddress={nft?.contract.id}
              useTitle
              size="xxs"
              radius="round"
              p="x2"
              pr="x5"
              backgroundColor="tertiary"
              borderRadius="round"
              className={clickAnimation}
            />
          </Link>
        </Flex>
        <Heading as="h1" size="xl">
          {fallbackTitle}
        </Heading>
        {/* {nft?.metadata?.description && (
          <Paragraph size="lg" className={lightFont}>
            {nft?.metadata?.description}
          </Paragraph>
        )} */}
        {nft?.owner && (
          <MarketUi
            contractAddress={nft.contract.id}
            tokenId={nft.tokenID}
            nft={nft}
          />
        )}
      </Stack>
    </Box>
  )
}
