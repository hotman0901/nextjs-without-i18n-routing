'use client'
import { enableReactComponents } from '@legendapp/state/config/enableReactComponents'
import { Memo, Show, useObservable, useObserve } from '@legendapp/state/react'
import { $React } from '@legendapp/state/react-web'
import { useTranslations } from 'next-intl';
import { useRef } from 'react'

import PageLayout from '@/components/PageLayout';

enableReactComponents()
export default function App() {
  const t = useTranslations('About');
  const renderCount = useRef(0).current
  const username$ = useObservable('')
  const password$ = useObservable('')
  const usernameError$ = useObservable('')
  const passwordError$ = useObservable('')
  const didSave$ = useObservable(false)
  const successMessage$ = useObservable('')

  useObserve(() => {
    if (didSave$.get()) {
      usernameError$.set(username$.get().length < 3 ?
        'Username must be > 3 characters' :
        ''
      )
      const pass = password$.get()
      passwordError$.set(
        pass.length < 10 ?
          'Password must be > 10 characters' :
          !pass.match(/d/) ?
            'Password must include a number' :
            ''
      )
    }
  })

  const onClickSave = () => {
    // setting triggers useObserve, updating error messages
    didSave$.set(true)

    if (!usernameError$.get() && !passwordError$.get()) {
      console.log('Submit form')
      passwordError$.delete()
      successMessage$.set('Saved!')
    }
  }

  return (
    <PageLayout title={t('title')}>
      <p>{t('description')}</p>
      <div>Renders: {renderCount}</div>
      <div>Username:</div>
      <$React.input
        className="input"
        $value={username$}
      />
      <div className="error">
        <Memo>{usernameError$}</Memo>
      </div>
      <div>Password:</div>
      <$React.input
        type="password"
        className="input"
        $value={password$}
      />
      <div className="error">
        <Memo>{passwordError$}</Memo>
      </div>
      <Show if={successMessage$}>
        {() => (
          <div>
            {successMessage$.get()}
          </div>
        )}
      </Show>
      <button onClick={onClickSave}>
        Save
      </button>
    </PageLayout>
  )
}
