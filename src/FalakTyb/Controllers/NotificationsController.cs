
using MediatR;
using System.Threading;
using System.Collections.Generic;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;
using awqaf.Domain;
using awqaf.Crosscutting.Exceptions;
using awqaf.Web.Extensions;
using awqaf.Web.Filters;
using awqaf.Web.Rest.Utilities;
using awqaf.Application.Queries;
using awqaf.Application.Commands;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace awqaf.Controllers
{
    [Authorize]
    [Route("api/notifications")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        private const string EntityName = "notification";
        private readonly ILogger<NotificationsController> _log;
        private readonly IMediator _mediator;

        public NotificationsController(ILogger<NotificationsController> log, IMediator mediator)
        {
            _log = log;
            _mediator = mediator;
        }

        [HttpPost]
        [ValidateModel]
        public async Task<ActionResult<Notification>> CreateNotification([FromBody] Notification notification)
        {
            _log.LogDebug($"REST request to save Notification : {notification}");
            if (notification.Id != 0)
                throw new BadRequestAlertException("A new notification cannot already have an ID", EntityName, "idexists");
            notification = await _mediator.Send(new NotificationCreateCommand { Notification = notification });
            return CreatedAtAction(nameof(GetNotification), new { id = notification.Id }, notification)
                .WithHeaders(HeaderUtil.CreateEntityCreationAlert(EntityName, notification.Id.ToString()));
        }

        [HttpPut("{id}")]
        [ValidateModel]
        public async Task<IActionResult> UpdateNotification(long id, [FromBody] Notification notification)
        {
            _log.LogDebug($"REST request to update Notification : {notification}");
            if (notification.Id == 0) throw new BadRequestAlertException("Invalid Id", EntityName, "idnull");
            if (id != notification.Id) throw new BadRequestAlertException("Invalid Id", EntityName, "idinvalid");
            notification = await _mediator.Send(new NotificationUpdateCommand { Notification = notification });
            return Ok(notification)
                .WithHeaders(HeaderUtil.CreateEntityUpdateAlert(EntityName, notification.Id.ToString()));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Notification>>> GetAllNotifications(IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of Notifications");
            var result = await _mediator.Send(new NotificationGetAllQuery { Page = pageable });
            return Ok(result.Content).WithHeaders(result.GeneratePaginationHttpHeaders());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetNotification([FromRoute] long id)
        {
            _log.LogDebug($"REST request to get Notification : {id}");
            var result = await _mediator.Send(new NotificationGetQuery { Id = id });
            return ActionResultUtil.WrapOrNotFound(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNotification([FromRoute] long id)
        {
            _log.LogDebug($"REST request to delete Notification : {id}");
            await _mediator.Send(new NotificationDeleteCommand { Id = id });
            return NoContent().WithHeaders(HeaderUtil.CreateEntityDeletionAlert(EntityName, id.ToString()));
        }
    }
}
