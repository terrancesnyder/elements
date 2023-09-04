import { gridStyle } from "../../theme"
import { Button } from "../button"
import { Card } from "../card"
import { Typography } from "../typography"

import { OAuth2Client, OAuth2ConsentRequest } from "@ory/client"

import { Checkbox } from "../checkbox"
import { Divider } from "../divider"

export type UserConsentCardProps = {
  csrfToken: string
  consent: OAuth2ConsentRequest
  cardImage?: string | React.ReactElement
  client_name: string
  requested_scope?: string[]
  scopes?: UserConsentScope[]
  client?: OAuth2Client
  action: string
  className?: string
}

export type UserConsentScope = {
  id: string
  label: string
  defaultChecked: boolean
  previousChecked: boolean
  checked: boolean
  disabled?: boolean
  description?: string
  hidden?: boolean // should this scope ever show to a user (inferred yes)
}

export const UserConsentCard = ({
  csrfToken,
  consent,
  cardImage,
  client_name = "Unnamed Client",
  requested_scope = [],
  scopes = [],
  client,
  action,
  className,
}: UserConsentCardProps) => {
  return (
    <Card
      className={className}
      heading={
        <div/>
      }
    >
      <div style={{ textAlign: "center" }}>
        <img src={cardImage} style={{ maxHeight: "120px" }} alt={client_name} />
      </div>
      <form action={action} method="post">
        <input type="hidden" name="_csrf" value={csrfToken} />
        <input
          type="hidden"
          name="consent_challenge"
          value={consent?.challenge}
        />
        <div className={gridStyle({ gap: 16 })}>
          <div className={gridStyle({ gap: 4 })} style={{ marginBottom: 16 }}>
            <center>
            <Typography size="small" variant="body2">
                <strong>{client_name}</strong> requests access to the following permissions:
            </Typography>
            </center>
          </div>

          <div className={gridStyle({ gap: 4 })}>
            {scopes.map((scope) => {
              return (
                <div>
                  {scope.disabled && (
                    <div style={{ color: '#ccc' }}>
                      <input type="hidden" name="grant_scope" value={scope.id} />
                      <Checkbox
                        key={scope.id}
                        label={scope.label}
                        value={scope.id}
                        checked={scope.checked}
                        readOnly
                        name="grant_scope"
                      />
                      <Typography size="tiny" variant="body2" hidden={scope.description == null}>
                        {scope.description}
                      </Typography>
                    </div>
                  )}

                  {scope.previousChecked == true && (
                    <div style={{ color: '#5d5d5d' }}>
                      <Checkbox
                        key={scope.id}
                        label={scope.label}
                        value={scope.id}
                        defaultChecked={scope.defaultChecked}
                        name="grant_scope"
                      />
                      <Typography size="tiny" variant="body2" hidden={scope.description == null}>
                        {scope.description}
                      </Typography>
                    </div>
                  )}

                  {scope.previousChecked == false && (
                    <div>
                      <Checkbox
                        key={scope.id}
                        label={scope.label}
                        value={scope.id}
                        defaultChecked={scope.defaultChecked}
                        name="grant_scope"
                      />
                      <Typography size="tiny" variant="body2" hidden={scope.description == null}>
                        {scope.description}
                      </Typography>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className={gridStyle({ gap: 4 })}>
            <Typography size="xsmall">
              Only grant permissions if you trust this site or app. You do not
              need to accept all permissions.
            </Typography>
          </div>
          <div className={gridStyle({ direction: "row" })}>
            {client?.policy_uri && (
              <a href={client.policy_uri} target="_blank" rel="noreferrer">
                <Typography size="xsmall">Privacy Policy</Typography>
              </a>
            )}
            {client?.tos_uri && (
              <a href={client.tos_uri} target="_blank" rel="noreferrer">
                <Typography size="xsmall">Terms of Service</Typography>
              </a>
            )}
          </div>
          <div
            className={gridStyle({ direction: "row" })}
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Button
              type="submit"
              id="reject"
              name="consent_action"
              value="reject"
              variant="error"
              header="Deny"
            />
            <Button
              type="submit"
              id="accept"
              name="consent_action"
              value="accept"
              variant="semibold"
              header="Allow"
            />
          </div>
        </div>
      </form>
    </Card>
  )
}
