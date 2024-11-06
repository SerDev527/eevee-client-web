import { Link, ListItem, OrderedList, Text, UnorderedList } from '@chakra-ui/react';
import React from 'react';

import variables from '@/styles/variables.module.scss';

export const PrivacyPolicyContentQBT = () => {
  return (
    <>
      <Text className="bold-large">プライバシーポリシー</Text>
      <Text pt="20px" className="text-small">
        本部（「究極のブロッコリーと鶏胸肉」のフランチャイズ本部を運営する会社を指し、以下同様とします。）及び店舗（店舗を運営する「究極のブロッコリーと鶏胸肉」のフランチャイズに加盟の事業者を指し、以下同様とします。）は、
        店舗がインターネットを通じて提供する通信販売サービス（フードデリバリーサービス・イートインサービス・テイクアウトサービス。以上を総称して以下「サービス」といいます。）に関連して本部及び店舗が取得する個人情報の取扱いに関する方針を次のとおり定めます。
      </Text>
      <Text className="text-small">
        なお、本文中の用語の定義は、個人情報の保護に関する法律（以下「個人情報保護法」といいます。）及び関連法令によります。
      </Text>

      <Text pt="20px" className="bold-medium">
        1 関係法令・ガイドライン等の遵守
      </Text>
      <Text className="text-small">
        本部及び店舗では、個人情報保護法その他の関係法令、個人情報保護委員会の定めるガイドライン等及び本プライバシーポリシーを遵守し、個人情報を適法かつ適正に取り扱います。
      </Text>

      <Text pt="20px" className="bold-medium">
        2 個人情報の取得
      </Text>
      <Text className="text-small">本部及び店舗は、ユーザーの個人情報を適法かつ適正な手段により取得します。</Text>

      <Text pt="20px" className="bold-medium">
        3 個人情報の利用目的
      </Text>
      <Text className="text-small">
        本部及び店舗は、ユーザーの個人情報について、以下の利用目的の範囲内又はその取得状況から明らかである利用目的の範囲内で利用し、
        ユーザーの同意がある場合又は法令で認められている場合を除き、他の目的で利用しません。
      </Text>

      <OrderedList className="text-small" my="10px">
        <ListItem>サービスの提供及びサービス上で行うユーザーサポートのため</ListItem>
        <ListItem>サービスの運営上必要な事項を通知するため</ListItem>
        <ListItem>サービスその他店舗が運営する他のサービスに関する情報を提供するため</ListItem>
        <ListItem>電子メール等により店舗の事業に関連する各種情報の配信のため</ListItem>
        <ListItem>サービスその他店舗が運営する他のサービスの改善及び新規開発に必要となる解析及び分析のため</ListItem>
        <ListItem>ユーザーからのお問い合わせへの対応のため</ListItem>
        <ListItem>個人を特定しない範囲での統計情報の作成及び利用のため</ListItem>
        <ListItem>代金の請求、返金、支払等及び関連する事務処理のため</ListItem>
      </OrderedList>

      <Text pt="20px" className="bold-medium">
        4 個人データの取扱いの委託
      </Text>
      <Text className="text-small">
        本部及び店舗は、業務を円滑に進めユーザーにより良いサービスを提供するため、ユーザーの個人データの取扱いを協力会社に委託する場合があります。
        ただし、委託する個人データは、委託する業務を遂行するのに必要最小限の情報に限定します。
      </Text>
      <Text className="text-small">
        なお、本部及び店舗が、サービス内外で第三者（ユーザー）から個人情報の取扱いの委託を受けた場合には、当該委託業務の内容に必要となる範囲内で利用します。
      </Text>

      <Text pt="20px" className="bold-medium">
        5 個人データの管理
      </Text>
      <Text className="text-small">1. データ内容の正確性の確保</Text>
      <Text className="text-small">
        本部及び店舗は、ユーザーの個人データにつき、利用目的の達成に必要な範囲内において、正確かつ最新の内容に保つとともに、
        利用する必要がなくなったときは当該個人データを消去するよう努めます。
      </Text>
      <Text className="text-small">2. 安全管理措置</Text>
      <Text className="text-small">
        本部及び店舗は、ユーザーの個人データの漏えい、滅失又は毀損の防止その他の安全管理のために必要かつ適切な措置を講じます。
      </Text>
      <Text className="text-small">3. 従業者の監督</Text>
      <Text className="text-small">
        本部及び店舗は、ユーザーの個人データを従業者に取り扱わせるに当たっては、
        個人情報の適正な取扱いを周知徹底するとともに適正な教育を行い、必要かつ適切な監督を行います。
      </Text>
      <Text className="text-small">4. 委託先の監督</Text>
      <Text className="text-small">
        本部及び店舗は、ユーザーの個人データの取扱いを委託する場合には、
        委託先には適切な安全管理措置を講じている協力会社を選定し、委託先に対し必要かつ適切な監督を行います。
      </Text>

      <Text pt="20px" className="bold-medium">
        6 共同利用について
      </Text>
      <Text className="text-small">
        本部及び店舗は、以下にしたがい、それぞれが取得した個人情報を共同利用することがあります。
      </Text>

      <Text pt="20px" className="text-small">
        （共同利用される個人情報の項目）
      </Text>
      <Text className="text-small">
        ユーザーの氏名、住所、電話番号、メールアドレス、購入された商品その他すべての個人データ
      </Text>

      <Text pt="20px" className="text-small">
        （共同利用する者の範囲）
      </Text>
      <Text className="text-small">
        <Link color={variables.monoSecondary} href="https://chompy-inc.com/" isExternal>
          株式会社Chompy
        </Link>
        （フードデリバリーサービス
        <Link color={variables.monoSecondary} href="https://chompy.jp/" isExternal>
          Chompy
        </Link>
        運営会社）
      </Text>

      <Text pt="20px" className="text-small">
        （共同利用する者の利用目的）
      </Text>
      <OrderedList className="text-small" my="10px">
        <ListItem>サービスの提供及びサービス上で行うユーザーサポートのため</ListItem>
        <ListItem>サービスの運営上必要な事項を通知するため</ListItem>
        <ListItem>サービス及び上記運営会社のサービスに関する情報を提供するため</ListItem>
        <ListItem>サービス及び上記運営会社のサービスの改善及び新規開発に必要となる解析及び分析のため</ListItem>
        <ListItem>ユーザーや行政機関からのお問い合わせへの対応のため</ListItem>
        <ListItem>個人を特定しない範囲での統計情報の作成及び利用のため</ListItem>
        <ListItem>代金の請求、返金、支払等及び関連する事務処理のため</ListItem>
      </OrderedList>

      <Text pt="20px" className="text-small">
        （共同利用される個人情報の管理について責任を有する者）
      </Text>
      <Text className="text-small">本部及び店舗</Text>

      <Text pt="20px" className="bold-medium">
        7 個人データの第三者提供
      </Text>
      <OrderedList className="text-small" my="10px">
        <ListItem>
          本部及び店舗は、ユーザーの個人データを本部又は店舗が提携する企業（フードデリバリーサービスを提供・運営する企業を含みますがこれに限られません。）その他の第三者（外国にある第三者を除きます。以下、本項において同じです。）に提供することがあり、かかる提供にユーザーはあらかじめ同意するものとします。
        </ListItem>
        <ListItem>
          前項及び前条に定める場合のほか、本部及び店舗は、ユーザーの事前同意がある場合又は個人情報保護法その他の法令で認められている場合を除き、ユーザーの個人データを第三者（委託先を除きます。）に提供いたしません。
        </ListItem>
      </OrderedList>

      <Text pt="20px" className="bold-medium">
        8 属性情報、行動履歴などの利用について
      </Text>
      <Text className="text-small">
        本部及び店舗では、サービスのご利用状況を把握し、サービスの利便性を向上するため、また、ユーザーの皆様に適した広告配信等のために、ユーザーのプロフィール等の属性情報、Cookie、IDFA、Advertising
        ID、又はアクセスログ、その他行動履歴などを保存、利用することがあります。これらの情報に特定の個人を識別する情報は含まれていません。店舗は、これらの情報をその内容に応じて適切に管理いたします。
      </Text>
      <Text className="text-small">
        また本部及び店舗のウェブサイトでは、閲覧履歴の収集・記録・分析のためにGoogle社のGoogle
        Analyticsを利用する場合があります。Google
        Analyticsでは、Cookieを使用し個人を特定する情報を含まずに情報を収集しています。Google
        Analyticsの無効設定は、Google社によるオプトアウトアドオンのダウンロードページで「Google
        Analyticsオプトアウトアドオン」をダウンロード及びインストールし、ブラウザのアドオン設定を変更することで実施することができます。なお、収集される情報はGoogle社のプライバシーポリシーに基づいて管理されます。
      </Text>
      <UnorderedList className="text-small" my="10px">
        <ListItem>
          <Link
            color={variables.monoSecondary}
            href="https://marketingplatform.google.com/about/analytics/terms/jp/"
            isExternal
          >
            Googleアナリティクスの利用規約
          </Link>
        </ListItem>
        <ListItem>
          <Link color={variables.monoSecondary} href="https://policies.google.com/privacy?hl=ja" isExternal>
            Googleプライバシーポリシー
          </Link>
        </ListItem>
        <ListItem>
          <Link
            color={variables.monoSecondary}
            href="https://tools.google.com/dlpage/gaoptout/eula.html?hl=ja"
            isExternal
          >
            Google Analyticsオプトアウトアドオン
          </Link>
        </ListItem>
      </UnorderedList>
      <Text className="text-small">（注）「Cookie」について</Text>
      <Text className="text-small">
        「Cookie」とは、ウェブページを利用したときに、ブラウザとサーバーとの間で送受信した利用履歴や入力内容などを、ユーザーのコンピュータにファイルとして保存しておく仕組みです。次回、ユーザーが同じページにアクセスすると、ウェブページの運営者は、Cookie
        の情報を使って、特定の個人を識別することなく、ユーザーごとに最適化させるためにウェブページ上の表示を変えることができます。ユーザーがブラウザの設定でCookie
        の送受信を許可している場合、ウェブサイトは、ユーザーのブラウザから Cookie を取得できます。
      </Text>
      <Text className="text-small">（注）「IDFA」と「Advertising ID」について</Text>
      <Text className="text-small">
        「IDFA」と「Advertising ID」は、ともにモバイルアプリケーションなどCookie
        が保存されない環境において、携帯端末等に発行される広告配信用の識別子です。IDFA とは、IdentificationFor
        Advertisers の略称であり、Apple Inc. がiOS に発行する広告用ID、Advertising ID は、Google Inc. が Android OS
        に発行する広告用 ID を指します。
      </Text>
      <Text className="text-small">（注）「アクセスログ」について</Text>
      <Text className="text-small">
        ウェブページへのアクセス状況をいい、ユーザーの閲覧したページのURL、アクセス時間、IPアドレス、ブラウザ種別、リファラ（ある特定のページのリンクから別のページに移動した際にブラウザが自動的に送信するリンク元のページの
        URL）等が含まれます。
      </Text>

      <Text pt="20px" className="bold-medium">
        9 保有個人データに関する受付、その他のお問い合わせ窓口
      </Text>
      <Text className="text-small">特定商取引法に関する表記内にある「事業者の連絡先」までご連絡ください。</Text>

      <Text pt="20px" className="bold-medium">
        10 個人情報の開示
      </Text>
      <Text className="text-small">
        本部及び店舗は、ユーザーから、個人情報保護法の定めに基づき個人情報の開示を求められたときは、ユーザーご本人からのご請求であることを確認の上で、ユーザーに対し、遅滞なく開示を行います（当該個人情報が存在しないときにはその旨を通知いたします。）。
        ただし、個人情報保護法その他の法令により、本部が開示の義務を負わない場合は、この限りではありません。
      </Text>

      <Text pt="20px" className="bold-medium">
        11 プライバシーポリシーの改定について
      </Text>
      <Text className="text-small">
        本部は、本プライバシーポリシーの内容を適宜見直し、必要に応じて変更することがあります。ただし、法令上ユーザーの同意が必要となるような本プライバシーポリシーの変更を行う場合、変更後の本プライバシーポリシーは、本部所定の方法で変更に同意したユーザーに対してのみ適用されるものとします。
        なお、本部は、本プライバシーポリシーを変更する場合には、変更後の本プライバシーポリシーの施行時期及び内容を本アプリ上での表示その他の適切な方法により周知し、又はユーザーに通知します。
      </Text>

      <Text pt="20px" className="bold-medium">
        12 本部情報
      </Text>
      <Text className="bold-small">事業者の名称</Text>
      <Text className="text-small">株式会社DORAYAKI</Text>
      <Text className="bold-small">事業者の所在地</Text>
      <Text className="text-small">東京都渋谷区松濤1-28-2</Text>
      <Text className="bold-small">運営責任者</Text>
      <Text className="text-small">塚本 洸介</Text>
      <Text className="text-small" mt="20px" align="right">
        ２０２２年６月１日制定
      </Text>
    </>
  );
};