import StadlerSupertram from '@announcement-data/systems/rolling-stock/StadlerSupertram'

import SystemPageTemplate from '@components/SystemPageTemplate'

import type { PageProps } from 'gatsby'

export default function StadlerSupertramPage({ location }: PageProps) {
  return <SystemPageTemplate system={StadlerSupertram} location={location} />
}
