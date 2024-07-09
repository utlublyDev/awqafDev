using awqaf.Domain;

using MediatR;

using System.Collections.Generic;

namespace awqaf.Application.Queries
{
    public class OffersGetAllOffersByProviderIdQuery : IRequest<IEnumerable<Offers>>
    {
  
        public string ProviderId { get; set; }
    }
}
