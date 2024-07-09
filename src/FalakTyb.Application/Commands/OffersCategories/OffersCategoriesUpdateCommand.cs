
using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class OffersCategoriesUpdateCommand : IRequest<OffersCategories>
    {
        public OffersCategories OffersCategories { get; set; }
    }
}
