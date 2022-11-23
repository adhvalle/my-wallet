import { describe, it, expect, vi, beforeAll } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { sendTransaction } from '@/api/wallet'
import { retrieveWallet } from '@/models/wallet'
import DrawerCrypto from '@/widgets/DrawerCrypto.vue'

vi.mock('@/api/wallet')
vi.mock('@/models/wallet')

describe('DrawerCrypto', () => {
  beforeAll(() => {
    retrieveWallet.mockReturnValue({})
  })
  it('renders the component', async () => {
    const wrapper = await mountComponent()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('emits on-close event', async () => {
    const wrapper = await mountComponent()
    wrapper.findComponent({ name: 'TheDrawer' }).vm.$emit('on-close')
    expect(wrapper.emitted('on-close')).toBeTruthy()
  })

  it('submits form successfully', async () => {
    sendTransaction.mockReturnValue({})
    const wrapper = await mountComponent()
    wrapper.find('.drawer-crypto__form').trigger('submit')
    await flushPromises()
    expect(wrapper.find('.drawer-crypto__response').classes()).toContain('drawer-crypto__response--success')
  })

  it('submits form with errors', async () => {
    sendTransaction.mockRejectedValue({})
    const wrapper = await mountComponent()
    wrapper.find('.drawer-crypto__form').trigger('submit')
    await flushPromises()
    expect(wrapper.find('.drawer-crypto__response').classes()).toContain('drawer-crypto__response--error')
  })

  const mountComponent = async () => {
    const wrapper = mount(DrawerCrypto)
    await flushPromises()
    return wrapper
  }
})