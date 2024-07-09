
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
    [Route("api/reviews-and-ratings")]
    [ApiController]
    public class ReviewsAndRatingsController : ControllerBase
    {
        private const string EntityName = "reviewsAndRating";
        private readonly ILogger<ReviewsAndRatingsController> _log;
        private readonly IMediator _mediator;

        public ReviewsAndRatingsController(ILogger<ReviewsAndRatingsController> log, IMediator mediator)
        {
            _log = log;
            _mediator = mediator;
        }

        [HttpPost]
        [ValidateModel]
        public async Task<ActionResult<ReviewsAndRating>> CreateReviewsAndRating([FromBody] ReviewsAndRating reviewsAndRating)
        {
            _log.LogDebug($"REST request to save ReviewsAndRating : {reviewsAndRating}");
            if (reviewsAndRating.Id != 0)
                throw new BadRequestAlertException("A new reviewsAndRating cannot already have an ID", EntityName, "idexists");
            reviewsAndRating = await _mediator.Send(new ReviewsAndRatingCreateCommand { ReviewsAndRating = reviewsAndRating });
            return CreatedAtAction(nameof(GetReviewsAndRating), new { id = reviewsAndRating.Id }, reviewsAndRating)
                .WithHeaders(HeaderUtil.CreateEntityCreationAlert(EntityName, reviewsAndRating.Id.ToString()));
        }

        [HttpPut("{id}")]
        [ValidateModel]
        public async Task<IActionResult> UpdateReviewsAndRating(long id, [FromBody] ReviewsAndRating reviewsAndRating)
        {
            _log.LogDebug($"REST request to update ReviewsAndRating : {reviewsAndRating}");
            if (reviewsAndRating.Id == 0) throw new BadRequestAlertException("Invalid Id", EntityName, "idnull");
            if (id != reviewsAndRating.Id) throw new BadRequestAlertException("Invalid Id", EntityName, "idinvalid");
            reviewsAndRating = await _mediator.Send(new ReviewsAndRatingUpdateCommand { ReviewsAndRating = reviewsAndRating });
            return Ok(reviewsAndRating)
                .WithHeaders(HeaderUtil.CreateEntityUpdateAlert(EntityName, reviewsAndRating.Id.ToString()));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReviewsAndRating>>> GetAllReviewsAndRatings(IPageable pageable)
        {
            _log.LogDebug("REST request to get a page of ReviewsAndRatings");
            var result = await _mediator.Send(new ReviewsAndRatingGetAllQuery { Page = pageable });
            return Ok(result.Content).WithHeaders(result.GeneratePaginationHttpHeaders());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetReviewsAndRating([FromRoute] long id)
        {
            _log.LogDebug($"REST request to get ReviewsAndRating : {id}");
            var result = await _mediator.Send(new ReviewsAndRatingGetQuery { Id = id });
            return ActionResultUtil.WrapOrNotFound(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReviewsAndRating([FromRoute] long id)
        {
            _log.LogDebug($"REST request to delete ReviewsAndRating : {id}");
            await _mediator.Send(new ReviewsAndRatingDeleteCommand { Id = id });
            return NoContent().WithHeaders(HeaderUtil.CreateEntityDeletionAlert(EntityName, id.ToString()));
        }
    }
}
